import * as disciplineRepository from "../repositories/disciplineRepository.js"

export async function getAllDisciplines() {

  const data = await disciplineRepository.findAllDisciplines()

  return data

}