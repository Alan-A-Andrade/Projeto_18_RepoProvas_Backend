export default function validateSchemaMiddleware(schema) {
    return function (req, response, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            console.log(validation.error);
            throw { type: "Unprocessable_Entity" };
        }
        next();
    };
}
