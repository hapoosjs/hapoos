const CLICreator = require("@nabh/cli-creator");
var modules = require("../config/module_configs.json");
const HapoosFactory = require("./hapoos_factory");
async function createCLI(apiMode) {
  var cli = await CLICreator.createMultiModuleCLI(modules, HapoosFactory, null, 
    [["-p, --provider <provider>", "Cloud provider ID"],
      ["-r, --region <region>", "Default region"]], apiMode);
  return cli;
}
module.exports = createCLI;
