const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Read package.json file
let pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "package.json")));

// Update direct dependencies
if (pkg.dependencies) {
    Object.keys(pkg.dependencies).forEach((key) => {
        execSync("npm remove " + key);
        execSync("npm install " + key);
        console.log("Updated direct dependency" + key);
    });
}

// Update devDependencies
if (pkg.devDependencies) {
    Object.keys(pkg.devDependencies).forEach((key) => {
        execSync("npm remove " + key);
        execSync("npm install " + key + " --save-dev");
        console.log("Updated direct dev dependency " + key)
    });
}

// Update direct dependencies

// Get package workspaces
let ws = pkg.workspaces;

// Update dependencies in all workspaces
for (const w of ws) updateDeps(w);

function updateDeps(wspace) {
    // Read package.json file
    let pkg = JSON.parse(fs.readFileSync(path.resolve(wspace, "package.json")));

    // Update dependencies
    if (pkg.dependencies) {
        Object.keys(pkg.dependencies).forEach((key) => {
            execSync("npm remove " + key + " -w " + wspace);
            execSync("npm install " + key + " -w " + wspace);
            console.log("Updated " + key + " in workspace " + wspace)
        });
    }

    // Update devDependencies
    if (pkg.devDependencies) {
        Object.keys(pkg.devDependencies).forEach((key) => {
            execSync("npm remove " + key + " -w " + wspace);
            execSync("npm install " + key + " --save-dev -w " + wspace);
            console.log("Updated " + key + " in workspace " + wspace)
        });
    }

}
