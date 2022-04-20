import joi from "joi"
import * as interfaces from "../interfaces/index.js"

const signUpSchema = joi.object<interfaces.userSignUp>({
  password: joi.string().required(),
  email: joi.string().required()
});

export default signUpSchema;