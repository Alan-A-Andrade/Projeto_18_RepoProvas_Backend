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

export async function addView(testId: number) {

  await client.tests.update({
    where: {
      id: testId
    },
    data: {
      views: { increment: 1 }
    }

  })
}