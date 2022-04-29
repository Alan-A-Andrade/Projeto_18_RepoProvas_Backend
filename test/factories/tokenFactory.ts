// tests/user.test.ts
import supertest from "supertest";
import app from "../../src/index.js";
import userBodyFactory from "./userBodyFactory.js";
import userFactory from "./userFactory.js";

export default async function tokenFactory() {

  const body = userBodyFactory();
  await userFactory(body);

  const response = await supertest(app).post("/auth/signin").send(body);

  return response.text

}