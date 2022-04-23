export default function validateSchemaMiddleware(schema) {
    return function (req, response, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            throw { type: "Bad_Request" };
        }
        next();
    };
}
