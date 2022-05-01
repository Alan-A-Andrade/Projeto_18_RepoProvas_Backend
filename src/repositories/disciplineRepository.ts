import { client } from "../database.js";
import * as interfaces from "../interfaces/index.js";

export async function findAllDisciplines() {

  const data = await client.disciplines.findMany(
    {
      include: {
        teachersDisciplines: true
      }
    }

  )

  return data
}

export async function findDisciplineById(disciplineId: number) {

  const data = await client.disciplines.findUnique(
    {
      where: {
        id: disciplineId
      }
    }
  )

  return data
}