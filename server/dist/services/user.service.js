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
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("~/lib/db");
const errors_1 = require("~/utils/errors");
class UserService {
    constructor() {
        this.registerUser = (body) => __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield db_1.db.user.findUnique({
                where: {
                    email: body.email
                }
            });
            if (foundUser) {
                throw new errors_1.BadRequestError(`User with email: ${body.email} already registered'`);
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(body.password, salt);
            const user = yield db_1.db.user.create({
                data: {
                    email: body.email,
                    name: body.name,
                    password: hashedPassword,
                    imageUrl: body.imageUrl || null
                }
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                imageUrl: user.imageUrl,
                role: user.role,
                isActive: user.isActive
            };
        });
    }
}
exports.default = new UserService();
