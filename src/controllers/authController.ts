
import { Request, Response } from 'express';
import * as interfaces from "../interfaces/index.js";
import * as authServices from "../services/authServices.js"
import * as api from "../api/api.js"


export async function signUp(req: Request, res: Response) {

  const { password, email }: interfaces.userSignUp = req.body;

  await authServices.signUp({ password, email })

  res.sendStatus(201);

};

export async function signIn(req: Request, res: Response) {

  const { password, email }: interfaces.userSignUp = req.body;

  const token = await authServices.signIn({ password, email })

  res.send(token).status(200);

};

export async function signInGitHub(req: Request, res: Response) {

  const { code }: api.githubSignIn = req.body

  const data = await api.signInGitHub(code)

  const githubUser = await api.getGitHubData(data.access_token, data.token_type)

  const token = await authServices.signInGitHub(githubUser.id, githubUser.email)


  res.send(token)

}
