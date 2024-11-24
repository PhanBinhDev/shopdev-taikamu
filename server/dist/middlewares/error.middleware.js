"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRequest = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("~/utils/errors");
const logger_1 = __importDefault(require("~/utils/logger"));
const ErrorRequest = (err, req, res, next) => {
    logger_1.default.error(err.message, { stack: err.stack });
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            error: 'Internal Server Error'
        });
    }
};
exports.ErrorRequest = ErrorRequest;
