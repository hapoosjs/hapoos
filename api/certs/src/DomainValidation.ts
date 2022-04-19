import { DNSRecord } from "@hapoosjs/api-common";

/**
 * Domain validation status for a security certificate
 */
export class DomainValidation {
  /**
   * Validation domain name
   */
  domainName: string;

  /**
   * DNS record that must be created to validate the domain
   */
  dnsRecord?: DNSRecord;

  /**
   * Email addresses used to validate the domain
   */
  emails?: string[];

  /**
   * Validation method: EMAIL or DNS
   */
  method?: string;

  /**
   * Validation status
   */
  status?: string;
}
