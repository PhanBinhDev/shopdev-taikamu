"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const logger_1 = __importDefault(require("~/utils/logger"));
const loggerMiddleware = (req, res, next) => {
    const startTime = new Date().getTime();
    res.on('finish', () => {
        const duration = new Date().getTime() - startTime;
        logger_1.default.http(`${req.method} ${req.originalUrl} ${req.statusCode} ${duration}ms`);
    });
    next();
};
exports.loggerMiddleware = loggerMiddleware;
