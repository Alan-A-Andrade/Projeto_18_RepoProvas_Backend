import { client } from "../database.js";
import * as interfaces from "../interfaces/index.js";

export async function insertOneUser(data: interfaces.userSignUp) {

  const user = await client.users.create({
    data: data
  })

  return user
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


export async function updateUserEmail({ id, password }: interfaces.userSignUp) {
  const user = await client.users.update({
    where: {
      id: id
    },
    data: {
      password: password
    }
  })

  return user
}

export async function upsertUserByEmail({ email, githubId }: interfaces.userSignUp) {

  const user = await client.users.upsert({
    where: {
      email: email
    },
    update: {
      githubId: githubId
    },
    create: {
      githubId: githubId
    }
  })

  return user
}

export async function findUserByGitHubId(githubId: number) {

  const user = await client.users.findUnique({
    where: {
      githubId: githubId
    }
  })

  return user
}


export async function getAllUserEmails() {

  const emails = await client.users.findMany({
    select: {
      email: true
    }
  })

  return emails
}
