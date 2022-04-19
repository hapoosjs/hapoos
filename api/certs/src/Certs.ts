import { Cert } from "./Cert";
import { CertMetadata } from "./CertMetadata";
import { CertMetadataList } from "./CertMetaDataList";
import { ListCertsOptions } from "./ListCertsOptions";
import { RequestCertOptions } from "./RequestCertOptions";

/**
 * Provides methods to manage SSL/TLS certificates
 */
export interface Certs {
  /**
   * List certificates
   * @param options @see ListOptions
   */
  listCerts(options?: ListCertsOptions): Promise<CertMetadataList>;

  /**
   * Request a new certificate
   * @param domain Primary domain for the certificate
   * @param options Additional certificate domains
   */
  requestCert(domain: string, options?: RequestCertOptions): Promise<string>;

  /**
   * Delete certificate
   * @param certId Certificate ID
   */
  deleteCert(certId: string): Promise<void>;

  /**
   * Get issued certificate
   * @param certId Certificate ID
   */
  getCert(certId: string): Promise<Cert>;

  /**
   * Get certificate metadata.
   * @param certId Certificate ID
   */
  getCertMetadata(certId: string): Promise<CertMetadata>;
}
