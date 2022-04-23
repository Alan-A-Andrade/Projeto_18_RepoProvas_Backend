import { Router } from "express";
import { ValidateToken } from "../middlewares/validateTokenMiddleware.js";
import * as teacherController from "../controllers/teacherController.js"

const teacherRouter: Router = Router();

teacherRouter.use(ValidateToken)

teacherRouter.get("/", teacherController.getAllTeachers)


export default teacherRouter