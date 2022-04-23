import { Router } from "express";
import { ValidateToken } from "../middlewares/validateTokenMiddleware.js";
import * as testController from "../controllers/testController.js";
var testRouter = Router();
testRouter.use(ValidateToken);
testRouter.get("/", testController.getAllTests);
export default testRouter;
