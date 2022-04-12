import { ListOptions } from "@hapoosjs/api-common";
/**
 * Options for {@link Buckets.listFileVersions} method
 */
export class ListFileVersionsOptions extends ListOptions {
  /**
   * File or folder path
   */
  filePath?: string;
}
