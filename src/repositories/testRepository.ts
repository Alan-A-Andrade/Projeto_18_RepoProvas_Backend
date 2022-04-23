import { client } from "../database.js";
import * as interfaces from "../interfaces/index.js";

export async function findAllTests() {

  const data = await client.tests.findMany(

  )

  return data
}
