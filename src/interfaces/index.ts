import { users, sessions, tests } from "@prisma/client"

export type user = Required<users>

export type userSignUp = Partial<user>

export type userSignIn = Omit<userSignUp, "name">

export type session = Required<sessions>

export type sessionCreateData = Omit<session, "id">

export type test = Required<tests>

export type testCreateData = Omit<test, "id">