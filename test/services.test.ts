// tests/user.test.ts
import supertest from "supertest";
import app from "../src/index.js";
import { client } from "../src/database.js";
import userBodyFactory from "./factories/userBodyFactory.js";
import userFactory from "./factories/userFactory.js";
import tokenFactory from "./factories/tokenFactory.js";
import testFactory from "./factories/testFactory.js";
import requiredFactory from "./factories/requiredsFactory.js";

describe("Route/User tests - POST auth/signUn", () => {
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


describe("Route/Tests tests - GET tests", () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it("should return 401 for a JWT token with invalid credentials", async () => {
    const body = {}

    const response = await supertest(app).get("/test").send(body).set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOm51bGwsImdpdGh1YklkIjo5OTk5OSwiaWF0IjoxNjUxMjUyNjM1fQ.IH3O1WHT8-DYjKug7j-9sTXBw4IKfCo3j1MrmzHVizg');

    expect(response.status).toEqual(401);

  });

  it("should return a object for valid JWT token", async () => {
    const body = {}

    const token = await tokenFactory()

    const response = await supertest(app).get("/test").send(body).set('Authorization', token);

    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");

  });


});

describe("Route/Tests tests - POST tests", () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it("should return 422 given a invalid body", async () => {


    const token = await tokenFactory()

    const body = {};

    const response = await supertest(app).post("/test").send(body).set('Authorization', token);


    expect(response.status).toEqual(422);
  });


  it("should return 201 and persist the user given a valid inputs", async () => {

    const { categoryId, teacherDisciplineId } = await requiredFactory()

    const token = await tokenFactory()

    const test = testFactory(categoryId, teacherDisciplineId)

    const response = await supertest(app).post("/test").send(test).set('Authorization', token);


    const tests = await client.tests.findMany({
      where: {
        name: test.name,
      },
    });

    expect(response.status).toEqual(201);
    expect(tests.length).toEqual(1)
  });


});

async function disconnect() {
  await client.$disconnect();
}


async function truncateUsers() {
  await client.$executeRaw`TRUNCATE TABLE 
  users, 
  tests, 
  teachers, 
  categories, 
  "teachersDisciplines", 
  disciplines, 
  terms;`;
}