import { ListOptions } from "@hapoosjs/api-common";

import { ChangeRecordOptions } from "./ChangeRecordOptions";
import { CreateZoneOptions } from "./CreateZoneOptions";
import { RecordList } from "./RecordList";
import { Zone } from "./Zone";
import { ZoneList } from "./ZoneList";

export interface DNS {
  /**
   *
   * @param name Domain/subdomain name
   * @param type Record type: TXT, CNAME, etc.
   * @param value Record value
   * @param options Optional zone ID and any other provider specific options
   */
  insertRecord(
    name: string,
    type: string,
    value: string,
    options?: ChangeRecordOptions
  ): Promise<void>;

  /**
   *
   * @param name Domain/subdomain name
   * @param type Record type: TXT, CNAME, etc.
   * @param value Record value
   * @param options Optional zone ID and any other provider specific options
   */
  upsertRecord(
    name: string,
    type: string,
    value: string,
    options?: ChangeRecordOptions
  ): Promise<boolean>;

  /**
   *
   * @param name Domain/subdomain name
   * @param type Record type: TXT, CNAME, etc.
   * @param value Record value
   * @param options Optional zone ID and any other provider specific options
   */
  deleteRecord(
    name: string,
    type: string,
    value: string,
    options?: ChangeRecordOptions
  ): Promise<boolean>;

  /**
   * Get a list of DNS records
   * @param name Domain name
   * @param options Pagination options
   */
  listRecords(name: string, options?: ListOptions): Promise<RecordList>;

  /**
   * Create a DNS zone
   * @param name Domain or subdomain name
   * @param options See {@link CreateZoneOptions }
   */
  createZone(name: string, options?: CreateZoneOptions): Promise<Zone>;

  /**
   * Delete DNS zone
   * @param zoneId Zone ID
   */
  deleteZone(zoneId: string): Promise<void>;

  /**
   * List DNS zones in the current account
   * @param options Pagination options
   */
  listZones(options?: ListOptions): Promise<ZoneList>;

  /**
   * Get DNS zone for the specified domain or subdomain
   * @param name Domain or subdomain
   */
  getZoneForName(name: string): Promise<Zone>;

  /**
   * Check if DNSSEC is enabled on a domain or subdomain
   * @param name Domain name or subdomain in case its managed by delegate DNS zone
   * @return <code>true</code> if DNSSEC is enabled, <code>false</code> otherwise
   */
  isDNSSECEnabled(): Promise<boolean>;

  /**
   * Turn DNSSEC on or off
   * @param name Domain or subdomain (if corresponding DNS zone exists)
   */
  setDNSSEC(name: string, flag: boolean): Promise<boolean>;
}
