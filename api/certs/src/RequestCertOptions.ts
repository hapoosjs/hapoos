import { BaseOptions } from "@hapoosjs/api-common";

/**
 * Options passed to { @link Certs.requestCert }
 */
export class RequestCertOptions extends BaseOptions {
  /**
   * Additional domains included in the certificate
   */
  altDomains?: string[];

  /**
   * Domain validation method: EMAIL or DNS
   */
  validationMethod?: string;
}
