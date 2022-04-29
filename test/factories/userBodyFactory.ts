// /tests/factories/userBodyFactory.ts

import { faker } from "@faker-js/faker";
import * as interfaces from "../../src/interfaces"

export default function userBodyFactory(): interfaces.userSignUp {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}