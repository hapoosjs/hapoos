'use strict'
const createCLI = require("../src/index");
var cli = undefined;

const TEST_BUCKET_PREFIX = "hapoos-test-bucket-";
const TEXT_FILE_PATH = 'index.html';
const TEST_FOLDER_NAME = 'images';
const bucket1 = TEST_BUCKET_PREFIX + "aws-1";
const bucket2 = TEST_BUCKET_PREFIX + "aws-2";

beforeAll(async () => {
  cli = await createCLI(true);
});

afterAll(
  async () => { await cleanup() }
);

test("Non-existent module", async () => {
  var resp = await cli.executeCommand("randommodulethatshouldnotexist");
  expect(resp.status).toBe(1);
});

test("List buckets", async () => {
  var resp = await cli.executeCommand("buckets list-buckets");
  expect(resp.response).toHaveProperty("buckets");
});

test("Create bucket", async () => {
  await cli.executeCommand("buckets create-bucket " + bucket1);
  let blist = await cli.executeCommand("buckets list-buckets");
  expect(blist.response.buckets).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: bucket1 })
    ])
  );
});

test("Bucket exists", async () => {
  var resp = await cli.executeCommand("buckets bucket-exists " + bucket1);
  expect(resp.response).toBe(true);
});

test('Website configuration', async () => {
  await cli.executeCommand("buckets set-website-configuration --index-page " + "index.html " + bucket1);
  let wConfig = await cli.executeCommand("buckets get-website-configuration " + bucket1);
  expect(wConfig.response).toEqual(expect.objectContaining({ indexPage: "index.html" }));
});










async function cleanup() {
  await cli.executeCommand("buckets clean " + bucket1);
  await cli.executeCommand("buckets delete-bucket " + bucket1);
  await cli.executeCommand("buckets clean " + bucket2);
  await cli.executeCommand("buckets delete-bucket " + bucket2);

}
