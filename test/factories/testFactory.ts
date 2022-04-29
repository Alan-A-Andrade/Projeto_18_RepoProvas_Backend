// /tests/factories/userBodyFactory.ts

import { faker } from "@faker-js/faker";
import * as interfaces from "../../src/interfaces"

export default function testFactory(categoryId: number, teacherDisciplineId: number): interfaces.testCreateData {
  return {
    name: faker.name.jobTitle(),
    pdfUrl: faker.internet.url(),
    categoryId: categoryId,
    teacherDisciplineId: teacherDisciplineId
  };
}