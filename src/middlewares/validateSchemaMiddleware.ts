import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export default function validateSchemaMiddleware(schema: Schema) {

  return (req: Request, response: Response, next: NextFunction) => {

    const validation = schema.validate(req.body);

    if (validation.error) {

      console.log(validation.error)

      throw { type: "Unprocessable_Entity" };
    }

    next();
  }
}