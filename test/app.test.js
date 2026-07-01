const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { app, resetItems } = require("../src/app");

test.beforeEach(() => {
  resetItems();
});

test("GET /health returns server status", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});

test("GET /items returns an empty list initially", async () => {
  const response = await request(app).get("/items");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, []);
});

test("POST /items creates a new item and GET/PUT/DELETE work", async () => {
  const createResponse = await request(app)
    .post("/items")
    .send({ name: "Laptop", description: "Gaming laptop" });

  assert.equal(createResponse.status, 201);
  assert.equal(createResponse.body.name, "Laptop");

  const itemId = createResponse.body.id;

  const getResponse = await request(app).get(`/items/${itemId}`);
  assert.equal(getResponse.status, 200);
  assert.equal(getResponse.body.name, "Laptop");

  const updateResponse = await request(app)
    .put(`/items/${itemId}`)
    .send({ name: "Laptop Pro", description: "Updated" });
  assert.equal(updateResponse.status, 200);
  assert.equal(updateResponse.body.name, "Laptop Pro");

  const deleteResponse = await request(app).delete(`/items/${itemId}`);
  assert.equal(deleteResponse.status, 200);
  assert.equal(deleteResponse.body.id, itemId);

  const finalGetResponse = await request(app).get(`/items/${itemId}`);
  assert.equal(finalGetResponse.status, 404);
});
