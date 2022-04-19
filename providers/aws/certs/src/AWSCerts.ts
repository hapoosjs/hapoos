import {
  ACMClient,
  CertificateDetail,
  DeleteCertificateCommand,
  DescribeCertificateCommand,
  DescribeCertificateCommandOutput,
  GetCertificateCommand,
  GetCertificateCommandOutput,
  ListCertificatesCommand,
  ListCertificatesCommandInput,
  ListCertificatesCommandOutput,
  RequestCertificateCommand,
  RequestCertificateCommandInput,
  RequestCertificateCommandOutput,
  ResourceRecord,
} from "@aws-sdk/client-acm";
import {
  Cert,
  CertMetadata,
  CertMetadataList,
  DomainValidation,
  ListCertsOptions,
  RequestCertOptions,
} from "@hapoosjs/api-certs";
import { BaseOptions, DNSRecord } from "@hapoosjs/api-common";
/**
 * Provides methods to manage SSL certificates
 * @remarks
 * Certificates in ACM are regional resources. To use a certificate with
 * Elastic Load Balancing for the same domain in more than one AWS region,
 * you must request or import a certificate for each region. For certificates
 * provided by ACM, this means you must revalidate each domain name in the
 * certificate for each region. You cannot copy a certificate between regions.
 *
 * For AWS CloudFront, you must request or import the certificate in the US
 * East (N. Virginia) region.
 */
export class AWSCerts {
  private client: ACMClient;
  private regionalClients: Map<string, ACMClient> = new Map<
    string,
    ACMClient
  >();
  private region = "us-east-1";

  constructor(options: BaseOptions) {
    this.region = options?.region ? options.region : "us-east-1";
    const input = { region: this.region, maxAttempts: 3 };
    this.client = new ACMClient(input);
    this.regionalClients.set(this.region, this.client);
  }

  private getClientFromRegion(region: string): ACMClient {
    let cl = this.regionalClients.get(region);
    if (cl) return cl;
    cl = new ACMClient({ region: region });
    this.regionalClients.set(region, cl);
    return cl;
  }

  private async invokeCommand(cmd, region?, connectRetried?): Promise<any> {
    const cl = region ? this.getClientFromRegion(region) : this.client;
    try {
      return await cl.send(cmd);
    } catch (e) {
      if (e.code == "ECONNABORTED" && !connectRetried) {
        return await this.invokeCommand(cmd, region, true);
      } else {
        throw e;
      }
    }
  }

  /**
   * List certificates
   * @param options @see ListOptions
   */
  async listCerts(options?: ListCertsOptions): Promise<CertMetadataList> {
    const input: ListCertificatesCommandInput = {};
    if (options?.statuses) {
      if (Array.isArray(options.statuses))
        input.CertificateStatuses = options.statuses;
      else input.CertificateStatuses = [options.statuses];
    }
    if (options?.start) input.NextToken = options.start;
    if (options?.maxItems) input.MaxItems = options.maxItems;
    const raw: ListCertificatesCommandOutput = await this.invokeCommand(
      new ListCertificatesCommand(input),
      options?.region
    );
    const resp: CertMetadataList = new CertMetadataList(raw);
    resp.next = raw.NextToken;
    const certs: CertMetadata[] = [];
    if (raw.CertificateSummaryList) {
      for (const c of raw.CertificateSummaryList) {
        const c2: CertMetadata = new CertMetadata(c);
        c2.id = c.CertificateArn;
        c2.domain = c.DomainName;
        certs.push(c2);
      }
    }
    resp.certs = certs;
    return resp;
  }

  /**
   * Request a new certificate
   * @param domain Primary domain for the certificate
   * @param options Additional certificate domains
   */
  async requestCert(
    domain: string,
    options?: RequestCertOptions
  ): Promise<string> {
    const input: RequestCertificateCommandInput = { DomainName: domain };
    if (options?.altDomains) input.SubjectAlternativeNames = options.altDomains;
    const valMethod = options?.validationMethod
      ? options.validationMethod
      : "DNS";
    input.ValidationMethod = valMethod;
    const resp: RequestCertificateCommandOutput = await this.invokeCommand(
      new RequestCertificateCommand(input),
      options?.region
    );
    return resp.CertificateArn;
  }

  /**
   * Delete certificate
   * @param certId Certificate ID
   */
  async deleteCert(certId: string): Promise<void> {
    const input = { CertificateArn: certId };
    const region = certId.split(":")[3];
    await this.invokeCommand(new DeleteCertificateCommand(input), region);
  }

  /**
   * Get issued certificate
   * @param certId Certificate ID
   */
  async getCert(certId: string): Promise<Cert> {
    const input = { CertificateArn: certId };
    const region = certId.split(":")[3];
    let raw: GetCertificateCommandOutput;
    try {
      raw = await this.invokeCommand(new GetCertificateCommand(input), region);
    } catch (e) {
      if (e.name == "RequestInProgressException") return undefined;
      throw e;
    }
    if (!raw) return undefined;
    const c: Cert = new Cert();
    c.certificate = raw.Certificate;
    c.certificateChain = raw.CertificateChain;
    return c;
  }

  /**
   * Get certificate metadata.
   * @param certId Certificate ID
   */
  async getCertMetadata(certId: string): Promise<CertMetadata> {
    const input = { CertificateArn: certId };
    const region = certId.split(":")[3];
    const raw: DescribeCertificateCommandOutput = await this.invokeCommand(
      new DescribeCertificateCommand(input),
      region
    );
    if (!raw || !raw.Certificate) return undefined;
    const cert: CertificateDetail = raw.Certificate;
    const resp: CertMetadata = new CertMetadata(cert);
    resp.altDomains = cert.SubjectAlternativeNames;
    resp.creationDate = cert.CreatedAt;
    resp.domain = cert.DomainName;
    resp.expirationDate = cert.NotAfter;
    resp.id = cert.CertificateArn;
    resp.issueDate = cert.IssuedAt;
    resp.issuer = cert.Issuer;
    resp.keyAlgorithm = cert.KeyAlgorithm;
    resp.signatureAlgorithm = cert.SignatureAlgorithm;
    resp.status = cert.Status;
    resp.subject = cert.Subject;
    resp.usedBy = cert.InUseBy;
    if (cert.DomainValidationOptions) {
      const dvs: DomainValidation[] = [];
      for (const dvi of cert.DomainValidationOptions) {
        const dv = new DomainValidation();
        dv.domainName = dvi.DomainName;
        dv.emails = dvi.ValidationEmails;
        if (dvi.ResourceRecord) {
          const rec: ResourceRecord = dvi.ResourceRecord;
          dv.dnsRecord = new DNSRecord(rec.Name, rec.Type, rec.Value);
        }
        dv.method = dvi.ValidationMethod;
        dv.status = dvi.ValidationStatus;
        dvs.push(dv);
      }
      resp.domainValidations = dvs;
    }
    return resp;
  }
}
