var errorLookupTable = {
    Bad_Request: 400,
    Unauthorized: 401,
    Unprocessable_Entity: 422,
    Not_Found: 404,
    Conflict: 409
};
export default function errorHandlingMiddleware(error, req, res, next) {
    console.log(error);
    if (!error.message) {
        error.message = "An error as occurred";
    }
    if (!errorLookupTable[error.type]) {
        return res.sendStatus(500);
    }
    return res.status(errorLookupTable[error.type]).send(error.message);
}
