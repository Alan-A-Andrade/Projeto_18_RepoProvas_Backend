import { Router } from "express";
import * as authController from "../controllers/authController.js"
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter: Router = Router();

authRouter.post("/signup", validateSchemaMiddleware(signUpSchema), authController.signUp)
authRouter.get("/hello", (req, res) => res.send("hello world"))

export default authRouter