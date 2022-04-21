import { Router } from "express";
import * as authController from "../controllers/authController.js"
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import authSchema from "../schemas/authSchema.js";

import { verifyToken } from "../services/authServices.js";

const authRouter: Router = Router();

authRouter.post("/signUp", validateSchemaMiddleware(authSchema), authController.signUp)
authRouter.get("/hello", async (req, res) => {

  const token = req.headers.authorization as string
  const user = await verifyToken(token)

  res.send({ userId: user })
})
authRouter.post("/signIn", validateSchemaMiddleware(authSchema), authController.signIn)

export default authRouter