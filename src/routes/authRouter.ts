import { Router } from "express";
import * as authController from "../controllers/authController.js"
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import authSchema from "../schemas/authSchema.js";


const authRouter: Router = Router();

authRouter.post("/signUp", validateSchemaMiddleware(authSchema), authController.signUp)
authRouter.get("/hello", (req, res) => { res.send("Hello World!") })
authRouter.post("/signIn", validateSchemaMiddleware(authSchema), authController.signIn)
authRouter.post("/signIn/oauth/github", authController.signInGitHub)

export default authRouter