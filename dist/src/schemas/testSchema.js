import joi from "joi";
var testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().required().uri(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required()
});
export default testSchema;
