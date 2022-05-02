import * as testRepository from "../repositories/testRepository.js"
import * as categoryRepository from "../repositories/categoryRepository.js"
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js"
import * as disciplineRepository from "../repositories/disciplineRepository.js"
import * as teacherRepository from "../repositories/teacherRepository.js"
import * as authRepository from "../repositories/authRepository.js"
import * as interfaces from "../interfaces/index.js";
import sgMail from '@sendgrid/mail'
import { createEmailText } from "../utils/emailUtils.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function getAllTests() {

  const testData = await testRepository.findAllTests()

  return testData

}

export async function createTest(data) {

  const formData = { ...data }
  formData.categoryId = parseInt(formData.categoryId)
  formData.teacherDisciplineId = parseInt(formData.teacherDisciplineId)

  const categoriesData = await categoryRepository.findCategoryById(formData.categoryId)
  if (!categoriesData) {
    throw { type: "Unprocessable_Entity" }
  }

  const teacherDiscipline = await teacherDisciplineRepository.findTeacherDisciplineById(formData.teacherDisciplineId)
  if (!teacherDiscipline) {
    throw { type: "Unprocessable_Entity" }
  }

  await testRepository.createTest(formData)

  const emails = await authRepository.getAllUserEmails()
  const teacher = await teacherRepository.findTeacherById(teacherDiscipline.teacherId)
  const discipline = await disciplineRepository.findDisciplineById(teacherDiscipline.disciplineId)
  const emailArray = emails.map(el => el.email)
  const msg = {
    to: emailArray,
    from: 'alanaa92@gmail.com',
    subject: `RepoProvas - Nova prova adicionada`,
    text: createEmailText(teacher.name, categoriesData.name, formData.name, discipline.name)
  };

  sgMail.sendMultiple(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

}

export async function updateViewCount(testId: number) {

  await testRepository.addView(testId)

}