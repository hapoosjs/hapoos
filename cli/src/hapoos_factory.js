module.exports = class HapoosFactory {
  static create(opts, moduleName) {
    if (!opts?.provider || opts.provider == "aws") {
      if (moduleName == "buckets") {
        let b = require("@hapoosjs/aws-buckets");
        return new b["AWSBuckets"](opts);
      }
      else if (moduleName == "certs") {
        let b = require("@hapoosjs/aws-certs");
        return new b["AWSCerts"](opts);
      }
    }

    // We could not find the module for the given provider
    throw new Error("Unsupported module " + moduleName + 
      " for provider " + opts?.provider ? opts.provider : "aws");
  }
};