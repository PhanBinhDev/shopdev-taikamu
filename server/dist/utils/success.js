"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATED = exports.OK = exports.SuccessResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
class SuccessResponse {
    constructor({ message = http_status_codes_1.ReasonPhrases.OK, statusCode = http_status_codes_1.StatusCodes.OK, metadata = {} }) {
        this.statusCode = statusCode;
        this.message = message;
        this.metadata = metadata;
    }
    send(res, headers = {}) {
        return res.status(this.statusCode).json(this);
    }
}
exports.SuccessResponse = SuccessResponse;
class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, statusCode: http_status_codes_1.StatusCodes.OK, metadata });
    }
}
exports.OK = OK;
class CREATED extends SuccessResponse {
    constructor({ message, metadata, options = {} }) {
        super({ message, statusCode: http_status_codes_1.StatusCodes.CREATED, metadata });
        this.options = options;
    }
}
exports.CREATED = CREATED;
