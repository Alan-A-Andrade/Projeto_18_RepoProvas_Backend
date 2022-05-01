import { client } from "../database.js";
import * as interfaces from "../interfaces/index.js";

export async function findAllTeacherDiscipline() {

  const teacherDiscipline = await client.teachersDisciplines.findMany({
  })

  return teacherDiscipline
}


export async function findTeacherDisciplineById(id: number) {

  const teacherDiscipline = await client.teachersDisciplines.findUnique({
    where: { id: id }
  })

  return teacherDiscipline
}



