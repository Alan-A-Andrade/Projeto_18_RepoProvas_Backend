import { Request, Response } from 'express';
import * as interfaces from "../interfaces/index.js";
import * as testServices from "../services/testServices.js"


export async function getAllTests(req: Request, res: Response) {

  const data = await testServices.getAllTests()

  res.send(data);

};

export async function createTest(req: Request, res: Response) {

  const data: interfaces.testCreateData = req.body

  await testServices.createTest(data)

  res.sendStatus(201);

};

export async function addView(req: Request, res: Response) {

  const { id } = req.params

  await testServices.updateViewCount(parseInt(id))

  res.sendStatus(200);

};