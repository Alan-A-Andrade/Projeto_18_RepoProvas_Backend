import { client } from "../database.js";
import * as interfaces from "../interfaces/index.js";

export async function insertOneUser(data: interfaces.userSignUp) {

  await client.users.create({
    data: data
  })

}

export async function findUserByEmail(email: string) {

  const user = await client.users.findUnique({
    where: {
      email: email
    }
  })

  return user
}

export async function findUserById(id: number) {

  const user = await client.users.findUnique({
    where: {
      id: id
    }
  })

  return user
}

export async function insertOneSession(userId: number) {

  const session = await client.sessions.create({
    data: { userId: userId }
  })

  return session
}

export async function findSessionById(id: number) {

  const session = await client.sessions.findUnique({
    where: {
      id: id
    }
  })

  return session
}


