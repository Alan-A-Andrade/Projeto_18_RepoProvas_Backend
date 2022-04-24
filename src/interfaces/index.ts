export interface user {
  id: number
  email: string
  password: string
  githubId: number
}

export type userSignUp = Partial<user>

export type userSignIn = Omit<userSignUp, "name">

export interface session {
  id: number
  userId: number
}

export type sessionCreateData = Omit<session, "id">