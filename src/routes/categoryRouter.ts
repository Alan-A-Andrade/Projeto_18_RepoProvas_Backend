import { Router } from "express";
import { ValidateToken } from "../middlewares/validateTokenMiddleware.js";
import * as categoryController from "../controllers/categoryController.js"

const categoryRouter: Router = Router();

categoryRouter.use(ValidateToken)

categoryRouter.get("/", categoryController.getAllCategories)


export default categoryRouter