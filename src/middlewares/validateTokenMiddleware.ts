
import { NextFunction, Request, Response } from "express";
import * as authServices from "../services/authServices.js";

export async function ValidateToken(req: Request, res: Response, next: NextFunction) {

  const token = req.headers.authorization as string

  const userId = await authServices.verifyToken(token)

  res.locals.userId = userId

  next();

}