import * as testRepository from "../repositories/testRepository.js"

export async function getAllTests() {

  const testData = await testRepository.findAllTests()

  return testData

}
