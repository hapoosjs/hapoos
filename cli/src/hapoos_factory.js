module.exports = class HapoosFactory {
  static create(opts, moduleName) {
    if (moduleName == "buckets") {
      let b = require("@hapoosjs/aws-buckets");
      return new b["AWSBuckets"]();
    }
  }
};