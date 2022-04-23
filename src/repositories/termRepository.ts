import { client } from "../database.js";
import * as interfaces from "../interfaces/index.js";

export async function findAllTerms() {

  const data = await client.terms.findMany(
    {
      select: {
        id: true,
        number: true,
        disciplines: {
          select: {
            id: true,
            name: true,
            teachersDisciplines: true
          }
        }
      },

    }
  )

  return data
}

