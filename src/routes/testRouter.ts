import { Router } from "express";
import { ValidateToken } from "../middlewares/validateTokenMiddleware.js";
import * as testController from "../controllers/testController.js"
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import testSchema from "../schemas/testSchema.js";
import multer from 'multer'

const upload = multer({ dest: './public/data/uploads/' })

const testRouter: Router = Router();

testRouter.use(ValidateToken)

testRouter.get("/", testController.getAllTests)
testRouter.post("/", upload.single('uploaded_file'), validateSchemaMiddleware(testSchema), testController.createTest)
testRouter.patch("/:id/addView", testController.addView)


export default testRouter