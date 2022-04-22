import { BaseOptions } from "@hapoosjs/api-common";

/**
 * Options supplied to insert, delete, upsert DNS records
 */
export class ChangeRecordOptions extends BaseOptions {
  /**
   * DNS zone ID
   */
  zoneId?: string;
}
