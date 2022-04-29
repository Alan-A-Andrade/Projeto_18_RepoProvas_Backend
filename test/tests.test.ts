// tests/user.test.ts
import supertest from "supertest";
import app from "../src/index.js";
import { client } from "../src/database.js";
import userBodyFactory from "./factories/userBodyFactory.js";
import userFactory from "./factories/userFactory.js";


describe("User tests - POST auth/signin", () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it("should return 200 and a token given valid credentials", async () => {
    const body = userBodyFactory();
    await userFactory(body);

    const response = await supertest(app).post("/auth/signin").send(body);

    expect(response.status).toEqual(200);
    expect(typeof response.text).toEqual("string");
    expect(response.text.length).toBeGreaterThan(25);

  });


});

async function disconnect() {
  await client.$disconnect();
}


async function truncateUsers() {
  await client.$executeRaw`TRUNCATE TABLE users, sessions;`;
}