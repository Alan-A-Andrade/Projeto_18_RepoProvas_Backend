import { Router } from "express";
import { ValidateToken } from "../middlewares/validateTokenMiddleware.js";
import * as disciplineController from "../controllers/disciplineController.js"

const disciplineRouter: Router = Router();

disciplineRouter.use(ValidateToken)

disciplineRouter.get("/", disciplineController.getAllDisciplines)


export default disciplineRouter