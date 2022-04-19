import { BaseResponse } from "@hapoosjs/api-common";

import { DomainValidation } from "./DomainValidation";

/**
 * SSL certificate metadata
 */
export class CertMetadata extends BaseResponse {
  /**
   * Provider-specific certificate ID
   */
  id: string;

  /**
   * Domain for which the certificate is issued
   */
  domain: string;

  /**
   * Status, e.g. PENDING, ISSUED, etc.
   */
  status?: string;

  /**
   * Issuer name
   */
  issuer?: string;

  /**
   * Certificate request date
   */
  creationDate?: Date;

  /**
   * Date on which the certificate was issued
   */
  issueDate?: Date;

  /**
   * Expiration date
   */
  expirationDate?: Date;

  /**
   * Key algorithm
   */
  keyAlgorithm?: string;

  /**
   * Key algorithm
   */
  signatureAlgorithm?: string;

  /**
   * Certificate subject
   */
  subject?: string;

  /**
   * Alternative domains covered by the certificate
   */
  altDomains?: string[];

  /**
   * Domain validation status and DNS record information
   */
  domainValidations?: DomainValidation[];

  /**
   * Names of cloud services that use this certificate
   */
  usedBy?: string[];
}
