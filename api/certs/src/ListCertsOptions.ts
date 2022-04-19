import { ListOptions } from "@hapoosjs/api-common";

/**
 * Options for {@link Certs.listCerts}
 */
export class ListCertsOptions extends ListOptions {
  /**
   * Limit returned certificates to specified statuses
   */
  statuses?: string[];
}
