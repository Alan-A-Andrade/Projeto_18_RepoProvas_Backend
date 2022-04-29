import * as interfaces from "../interfaces/index.js";
import * as authRepository from "../repositories/authRepository.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export async function signUp({ password, email }: interfaces.userSignUp) {

  const user = await authRepository.findUserByEmail(email)

  if (user) {
    throw { type: "Conflict" }
  }

  const hashPassword = bcrypt.hashSync(password, 10)

  await authRepository.insertOneUser({ password: hashPassword, email })

}

export async function signIn({ password, email }: interfaces.userSignUp) {

  const user = await authRepository.findUserByEmail(email)

  if (!user) {
    throw { type: "Unauthorized" }
  }


  const checkAuth = bcrypt.compareSync(password, user.password)

  if (!checkAuth) {
    throw { type: "Unauthorized" }
  }

  const chaveSecreta = process.env.JWT_SECRET;

  delete user.password

  const token = jwt.sign(user, chaveSecreta);

  return token

}


export async function verifyToken(token: string) {


  const chaveSecreta = process.env.JWT_SECRET;

  try {

    const { id, email, githubId } = jwt.verify(token, chaveSecreta) as { id: number, email: string | undefined, githubId: number | undefined }

    let user
    if (!githubId) {
      user = authRepository.findUserByEmail(email)
    }
    else {
      user = authRepository.findUserByEmail(email)
    }
    if (!user) {
      throw { type: "Unauthorized" }
    }

    return user

  } catch {
    throw { type: "Unauthorized" }
  }

}

export async function signInGitHub(githubId: number, email: string) {

  const githubUser = await authRepository.findUserByGitHubId(githubId)

  if (!githubUser) {

    if (!email) {
      const user = await authRepository.insertOneUser({ githubId })

      const chaveSecreta = process.env.JWT_SECRET;

      delete user.password

      const token = jwt.sign(user, chaveSecreta);

      return token

    }

    const user = await authRepository.upsertUserByEmail({ email: email, githubId: githubId })

    const chaveSecreta = process.env.JWT_SECRET;

    delete user.password

    const token = jwt.sign(user, chaveSecreta);

    return token

  }

  const chaveSecreta = process.env.JWT_SECRET;

  delete githubUser.password

  const token = jwt.sign(githubUser, chaveSecreta);

  return token

}