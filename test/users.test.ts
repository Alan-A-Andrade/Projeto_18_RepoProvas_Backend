// tests/user.test.ts
import supertest from "supertest";
import app from "../src/index.js";
import { client } from "../src/database.js";
import userBodyFactory from "./factories/userBodyFactory.js";
import userFactory from "./factories/userFactory.js";

describe("User tests - POST auth/signUn", () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it("should return 201 and persist the user given a valid body", async () => {

    const body = userBodyFactory();

    const response = await supertest(app).post("/auth/signup").send(body);
    const user = await client.users.findUnique({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toEqual(201);
    expect(user).not.toBeNull();
  });

  it("should return 422 given a invalid body", async () => {
    const body = {};

    const response = await supertest(app).post("/auth/signup").send(body);

    expect(response.status).toEqual(422);
  });

  it("should return 409 given a duplicate email", async () => {
    const body = userBodyFactory();

    await supertest(app).post("/auth/signup").send(body);
    const response = await supertest(app).post("/auth/signup").send(body);
    const users = await client.users.findMany({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toEqual(409);
    expect(users.length).toEqual(1);
  });
});

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


  it("should return 401 given invalid email", async () => {
    const body = userBodyFactory();

    const response = await supertest(app).post("/auth/signin").send(body);

    expect(response.status).toEqual(401);
  });

  it("should return 401 given invalid password", async () => {
    const body = userBodyFactory();
    await userFactory(body);

    const response = await supertest(app)
      .post("/auth/signin")
      .send({
        ...body,
        password: "bananinha",
      });

    expect(response.status).toEqual(401);
  });
});

async function disconnect() {
  await client.$disconnect();
}


async function truncateUsers() {
  await client.$executeRaw`TRUNCATE TABLE users, sessions;`;
}