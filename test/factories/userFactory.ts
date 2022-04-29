// /tests/factories/userFactory.ts

import bcrypt from "bcrypt";
import { client } from "../../src/database.js";
import * as interfaces from "../../src/interfaces"

export default async function userFactory(user: interfaces.userSignUp) {
  await client.users.create({
    data: {
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    },
  });
}