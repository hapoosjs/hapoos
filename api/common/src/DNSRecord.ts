/**
 * DNS record entry such as CNAME, TXT, etc.
 */
export class DNSRecord {
  /**
   * Domain name
   */
  name: string;

  /**
   * Record type, e.g. TXT, A
   */
  type: string;

  /**
   * Record value
   */
  value: string;

  /**
   * Creates a new DNS record specification
   * @param name Domain/subdomain name
   * @param type Record type: CNAME, TXT, etc.
   * @param value Record value
   */
  constructor(name: string, type: string, value: string) {
    this.name = name;
    this.type = type;
    this.value = value;
  }
}
