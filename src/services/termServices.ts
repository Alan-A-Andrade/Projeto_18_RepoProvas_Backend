import * as termRepository from "../repositories/termRepository.js"

export async function getAllTerms() {

  const termData = await termRepository.findAllTerms()

  return termData

}