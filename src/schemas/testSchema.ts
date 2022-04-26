import joi from "joi"
import * as interfaces from "../interfaces/index.js"

const testSchema = joi.object<interfaces.testCreateData>({
  name: joi.string().required(),
  pdfUrl: joi.string().required().uri(),
  categoryId: joi.number().required(),
  teacherDisciplineId: joi.number().required()
});

export default testSchema;