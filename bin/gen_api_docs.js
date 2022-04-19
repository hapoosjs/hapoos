const fs = require("fs");
const path = require("path");
const process = require("process");

const { APIExtractor } = require("@nabh/ts-api-extractor");

// Read package.json file
let pkg = fs.readFileSync(path.resolve(__dirname, "..", "package.json"));

// Construct the list of packages to be documented
let ws = JSON.parse(pkg).workspaces;
let packages = [];
for (let i=0; i<ws.length; i++) if (ws[i] != "cli") packages.push(ws[i]);

// Use ts-documenter to generate API documentation in target directory
document();

async function document() { 
    await APIExtractor.document(packages, process.argv[2]);
}
