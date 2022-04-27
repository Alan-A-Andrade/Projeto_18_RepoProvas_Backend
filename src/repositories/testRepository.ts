import { client } from "../database.js";
import * as interfaces from "../interfaces/index.js";

export async function findAllTests() {

  const data = await client.tests.findMany(

  )

  return data
}

export async function createTest(data: interfaces.testCreateData) {

  await client.tests.create({
    data: data
  })
}