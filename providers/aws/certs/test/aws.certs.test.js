const CertsAPITests = require("@hapoosjs/api-certs/test/certs_test.js");
const { AWSCerts } = require("../dist/dist-cjs/AWSCerts");

const region = "us-west-2";
CertsAPITests(new AWSCerts(), "aws", region); 