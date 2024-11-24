"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.getUser = void 0;
const user_service_1 = __importDefault(require("~/services/user.service"));
const asyncHandler_1 = require("~/utils/asyncHandler");
const success_1 = require("~/utils/success");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Hello');
});
exports.getUser = getUser;
const registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new success_1.CREATED({
        message: 'User created successfully',
        metadata: yield user_service_1.default.registerUser(req.body)
    }).send(res);
}));
exports.registerUser = registerUser;
