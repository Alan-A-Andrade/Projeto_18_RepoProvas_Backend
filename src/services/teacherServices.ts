import * as teacherRepository from "../repositories/teacherRepository.js"

export async function getAllTeachers() {

  const categoriesData = await teacherRepository.findAllTeachers()

  return categoriesData

}