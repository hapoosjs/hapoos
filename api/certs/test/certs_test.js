'use strict'
const fs = require("fs");
const path = require("path")
var CERT_ID = undefined;
var EXISTING_CERT_ID = undefined;

module.exports = (certs, provider, region) => {

  afterAll(
    async () => { await cleanup(certs, provider) }
  );

  test("List certificates", async () => {
    let cs = await certs.listCerts({maxItems: 1})
    let next = cs.next;
    let id = cs.certs[0].id;
    expect(cs.certs.length).toBe(1);
    EXISTING_CERT_ID = cs.certs[0].id;
    cs = await certs.listCerts({start: next});
    expect(cs.certs[0].id).not.toBe(id);
  });

  test("Request certificate", async () => {
    CERT_ID = await certs.requestCert("testdomain.com", { altDomains: ["www.testdomain.com"], region: region});
    expect(CERT_ID).toBeTruthy();
  });

  test("Get certificate", async () => {
    expect(await certs.getCert(EXISTING_CERT_ID)).toHaveProperty("certificate");
  });

  test("Get certificate metadata", async () => {
    expect(await certs.getCertMetadata(CERT_ID)).toHaveProperty("id");
  });

}

async function cleanup(certs, provider) {
  certs.deleteCert(CERT_ID);
  return true;
}

