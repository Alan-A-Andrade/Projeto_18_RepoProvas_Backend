import joi from "joi"
import * as interfaces from "../interfaces/index.js"

const authSchema = joi.object<interfaces.userSignUp>({
  password: joi.string().required(),
  email: joi.string().required()
});

export default authSchema;