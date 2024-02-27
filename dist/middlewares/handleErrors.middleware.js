"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const zod_1 = require("zod");
const errors_1 = require("./errors");
const jsonwebtoken_1 = require("jsonwebtoken");
class HandleErrorMiddleware {
}
HandleErrorMiddleware.execute = (error, _, res, __) => {
    if (error instanceof errors_1.AppError)
        return res.status(error.status).json({ message: error.message });
    if (error instanceof zod_1.ZodError)
        return res.status(409).json({ message: error.errors });
    if (error instanceof jsonwebtoken_1.JsonWebTokenError)
        return res.status(401).json({ message: error.message });
    return res.status(500).json({ message: "Internal Server Error." });
};
const handleErrors = HandleErrorMiddleware.execute;
exports.handleErrors = handleErrors;
