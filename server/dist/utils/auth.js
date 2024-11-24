"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyService = exports.CryptoService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const header_1 = require("~/constants/header");
const errors_1 = require("./errors");
class CryptoService {
    static generateKeyPair() {
        const privateKey = crypto_1.default.randomBytes(32).toString('hex');
        const publicKey = crypto_1.default
            .createHash('sha256')
            .update(privateKey)
            .digest('hex');
        return { privateKey, publicKey };
    }
    // Hash API key để lưu vào DB
    static hashApiKey(apiKey) {
        return crypto_1.default.createHash('sha256').update(apiKey).digest('hex');
    }
}
exports.CryptoService = CryptoService;
class ApiKeyService {
    static checkApiKey(req, res, next) {
        var _a;
        const key = (_a = req.headers[header_1.HEADER.API_KEY]) === null || _a === void 0 ? void 0 : _a.toString();
        if (!key) {
            return new errors_1.ForbiddenError('Failed to check API key');
        }
        // const objKey = await findKeyByUserId(key)
    }
}
exports.ApiKeyService = ApiKeyService;
