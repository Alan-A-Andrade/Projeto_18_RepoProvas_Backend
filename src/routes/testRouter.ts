import { Router } from "express";
import { ValidateToken } from "../middlewares/validateTokenMiddleware.js";
import * as testController from "../controllers/testController.js"
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import testSchema from "../schemas/testSchema.js";

const testRouter: Router = Router();

testRouter.use(ValidateToken)

testRouter.get("/", testController.getAllTests)
testRouter.post("/", validateSchemaMiddleware(testSchema), testController.createTest)


export default testRouter