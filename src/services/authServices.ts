import * as interfaces from "../interfaces/index.js";
import * as authRepository from "../repositories/authRepository.js"


export async function signUp({ password, email }: interfaces.userSignUp) {

  const user = await authRepository.findUserByEmail(email)

  if (user) {
    throw { type: "Bad_Request" }
  }

  await authRepository.insertOneUser({ password, email })

}