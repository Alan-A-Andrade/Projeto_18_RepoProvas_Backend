import * as interfaces from "../interfaces/index.js";
import * as authRepository from "../repositories/authRepository.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export async function signUp({ password, email }: interfaces.userSignUp) {

  const user = await authRepository.findUserByEmail(email)

  if (user) {
    throw { type: "Bad_Request" }
  }

  const hashPassword = bcrypt.hashSync(password, 10)

  await authRepository.insertOneUser({ password: hashPassword, email })

}

export async function signIn({ password, email }: interfaces.userSignUp) {

  const user = await authRepository.findUserByEmail(email)

  const checkAuth = bcrypt.compareSync(password, user.password)

  if (!checkAuth) {
    throw { type: "Unauthorized" }
  }

  const session = await authRepository.insertOneSession(user.id)

  const chaveSecreta = process.env.JWT_SECRET;

  const token = jwt.sign(session.id.toString(), chaveSecreta);

  return token

}


export async function verifyToken(token: string) {


  const chaveSecreta = process.env.JWT_SECRET;

  const sessionId = jwt.verify(token, chaveSecreta) as string

  const session = await authRepository.findSessionById(parseInt(sessionId))

  return session.userId

}