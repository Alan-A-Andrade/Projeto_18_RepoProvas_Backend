import { users, tests, categories } from "@prisma/client"

export type user = Required<users>

export type userSignUp = Partial<user>

export type userSignIn = Omit<userSignUp, "name">

export type test = Required<tests>

export type testCreateData = Omit<Omit<test, "id">, "views">

export type category = Partial<categories>