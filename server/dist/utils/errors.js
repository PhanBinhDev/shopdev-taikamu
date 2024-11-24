"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.ForbiddenError = exports.AuthFailureError = exports.NotFoundError = exports.AppError = void 0;
const http_status_codes_1 = require("http-status-codes");
class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(message = http_status_codes_1.ReasonPhrases.NOT_FOUND, statusCode = http_status_codes_1.StatusCodes.NOT_FOUND) {
        super(message, statusCode);
    }
}
exports.NotFoundError = NotFoundError;
class AuthFailureError extends AppError {
    constructor(message = http_status_codes_1.ReasonPhrases.UNAUTHORIZED, statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}
exports.AuthFailureError = AuthFailureError;
class ForbiddenError extends AppError {
    constructor(message = http_status_codes_1.ReasonPhrases.FORBIDDEN, statusCode = http_status_codes_1.StatusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}
exports.ForbiddenError = ForbiddenError;
class BadRequestError extends AppError {
    constructor(message = http_status_codes_1.ReasonPhrases.BAD_REQUEST, statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST) {
        super(message, statusCode);
    }
}
exports.BadRequestError = BadRequestError;
