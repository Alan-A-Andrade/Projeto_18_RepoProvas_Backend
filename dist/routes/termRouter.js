import { Router } from "express";
import { ValidateToken } from "../middlewares/validateTokenMiddleware.js";
import * as termController from "../controllers/termController.js";
var termRouter = Router();
termRouter.use(ValidateToken);
termRouter.get("/", termController.getAllTerms);
export default termRouter;
