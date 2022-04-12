import { BaseOptions } from "@hapoosjs/api-common";

/**
 * Options passed when downloading a file
 */
export class GetFileOptions extends BaseOptions {
  /**
   * Constructs the options object with supplied provider-specific options
   * @param providerOptions Provider-specific options
   */
  constructor(providerOptions: any) {
    super(providerOptions);
  }

  /**
   * File version ID
   */
  versionId?: string;
}
