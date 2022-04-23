import { Request, Response } from 'express';
import * as interfaces from "../interfaces/index.js";
import * as testServices from "../services/testServices.js"


export async function getAllTests(req: Request, res: Response) {

  const data = await testServices.getAllTests()

  res.send(data);

};