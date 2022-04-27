import app from '../src';
import supertest from 'supertest';

describe("GET /auth/hello", () => {
  it("given a valid task it should return 201", async () => {

    const result = await supertest(app).get("/auth/hello").send();
    const status = result.text;

    console.log(result)

    expect(status).toEqual("Hello World!");
  });
});