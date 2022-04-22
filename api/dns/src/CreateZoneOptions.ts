import { BaseOptions } from "@hapoosjs/api-common";

export class CreateZoneOptions extends BaseOptions {
  /**
   * Set this to true if you want to create private DNS zone
   */
  private?: boolean = false;

  /**
   * VPC attached to this zone. Applicable only for private zones
   */
  vpcId?: string;

  /**
   * VPC region for this zone. Applicable only for private zones
   */
  vpcRegion?: string;
}
