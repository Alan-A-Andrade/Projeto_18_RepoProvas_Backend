import joi from "joi";
var authSchema = joi.object({
    password: joi.string().required(),
    email: joi.string().required()
});
export default authSchema;
