import { client } from "../database.js";
import * as interfaces from "../interfaces/index.js";

export async function findAllTeachers() {

  const data = await client.teachers.findMany(
    {
      select: {
        id: true,
        name: true,
        teachersDisciplines: true
      }
    }
  )

  return data
}


export async function findTeacherById(teacherId: number) {

  const data = await client.teachers.findUnique(
    {
      where: {
        id: teacherId
      }
    }
  )

  return data
}
