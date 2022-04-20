export interface user {
  id: number
  email: string
  password: string
}

export type userSignUp = Omit<user, "id">

export type userSignIn = Omit<userSignUp, "name">

export interface session {
  id: number
  userId: number
}

export type sessionCreateData = Omit<session, "id">