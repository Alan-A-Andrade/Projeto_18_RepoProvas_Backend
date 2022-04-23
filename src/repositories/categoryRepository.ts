import { client } from "../database.js";
import * as interfaces from "../interfaces/index.js";

export async function findAllCategories() {

  const data = await client.categories.findMany(
    {
      select: {
        id: true,
        name: true,
        tests: {
          include: {
            teachersDisciplines: {
              include: {
                teacher: true
              }
            },
          }
        }

      },

    }
  )

  return data
}
