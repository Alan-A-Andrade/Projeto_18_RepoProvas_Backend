
import { Request, Response } from 'express';
import * as interfaces from "../interfaces/index.js";
import * as authServices from "../services/authServices.js"


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

