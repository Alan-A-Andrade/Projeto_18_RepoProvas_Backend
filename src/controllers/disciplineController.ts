import { Request, Response } from 'express';
import * as interfaces from "../interfaces/index.js";
import * as disciplineServices from "../services/disciplineServices.js"


export async function getAllDisciplines(req: Request, res: Response) {

  const data = await disciplineServices.getAllDisciplines()

  res.send(data);

};