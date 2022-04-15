#!/usr/bin/env node
'use strict'
const createCLI = require("../src/index");
async function run() {
    let cli = await createCLI();
    await cli.run();
}
run();