/**
 * SSL certificate
 */
export class Cert {
  /**
   * Certificate
   */
  certificate: string;

  /**
   * Certificates forming the requested certificate's chain of trust
   */
  certificateChain?: string;
}
