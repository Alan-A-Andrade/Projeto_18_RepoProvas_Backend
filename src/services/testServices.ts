import * as testRepository from "../repositories/testRepository.js"
import * as interfaces from "../interfaces/index.js";

export async function getAllTests() {

  const testData = await testRepository.findAllTests()

  return testData

}

export async function createTest(data: interfaces.testCreateData) {

  await testRepository.createTest(data)

}

export async function updateViewCount(testId: number) {

  await testRepository.addView(testId)

}