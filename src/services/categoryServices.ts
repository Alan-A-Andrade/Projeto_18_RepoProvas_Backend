import * as categoryRepository from "../repositories/categoryRepository.js"

export async function getAllCategories() {

  const categoriesData = await categoryRepository.findAllCategories()

  return categoriesData

}
