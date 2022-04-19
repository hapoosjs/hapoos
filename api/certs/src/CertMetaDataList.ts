import { ListResponse } from "@hapoosjs/api-common";

import { CertMetadata } from "./CertMetadata";

/**
 * List of certificate metadata records with pagination information
 */
export class CertMetadataList extends ListResponse {
  certs?: CertMetadata[];
}
