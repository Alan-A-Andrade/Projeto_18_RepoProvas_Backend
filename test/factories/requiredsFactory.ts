
import bcrypt from "bcrypt";
import { client } from "../../src/database.js";
import * as interfaces from "../../src/interfaces"
import { faker } from "@faker-js/faker";


export default async function requiredFactory() {

  const teacherName = faker.name.findName()

  const teacher = await client.teachers.upsert({
    where: { name: teacherName },
    update: {},
    create: {
      name: teacherName
    },
  });

  const termNumber = faker.datatype.number(10)

  const term = await client.terms.upsert({
    where: { number: termNumber },
    update: {},
    create: {
      number: termNumber
    }
  })

  const disciplineName = faker.name.jobArea()

  const discipline = await client.disciplines.upsert({
    where: { name: disciplineName },
    update: {},
    create: {
      name: disciplineName,
      termId: term.id
    }
  })

  const teacherDiscipline = await client.teachersDisciplines.create({
    data: {
      teacherId: teacher.id,
      disciplineId: discipline.id
    }
  })

  const categoryName = `P${faker.datatype.number(6)}`

  const category = await client.categories.upsert({
    where: { name: categoryName },
    update: {},
    create: {
      name: categoryName
    }
  })

  const requirements = {
    categoryId: category.id,
    teacherDisciplineId: teacherDiscipline.id
  }

  return requirements

}
