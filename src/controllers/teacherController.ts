import { Request, Response } from 'express';
import * as interfaces from "../interfaces/index.js";
import * as teacherServices from "../services/teacherServices.js"


export async function getAllTeachers(req: Request, res: Response) {

  const data = await teacherServices.getAllTeachers()

  res.send(data);

};