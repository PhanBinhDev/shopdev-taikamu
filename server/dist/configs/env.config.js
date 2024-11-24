"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/mern-auth-ts',
    JWT_SECRET: process.env.JWT_SECRET ||
        '8355d1ac3e13a17769bf4df95a53b18b883f9a03116ba79b07e5e7292c68b74926779aa0e77e80c87ac9ee16c1bd5af5fff9e6a19703f9a54a7924caa6966e554b3cd694a0d4b81d70f5439542c48268691a28602c903f35dfd8aa7dd6b282ffacd0c3ff24cd57a688c14a3df23587a4d648289211d23b43a1ee26de8d3265bd3ad1770dcc5f1a7fadc6d74df0d64344895a1e8a739d34330423fce4f8744c94789fef883bb1eac75ce19963407b1aab9b8631671270b33f1a9d7be84430df0959d61e6621c24311964a4fa35558237bddf8694b4f43520eb1b122015862c07dfadf5319964df7288cf100aaadc07dc75f5783e9fb087cb68ccfd832fd0859b5',
    JWT_EXPIRE: process.env.JWT_EXPIRE || '1h',
    SESSION_SECRET: process.env.SESSION_SECRET ||
        '3e13a17769bf4df95a53b18b883f9a03116ba79b07e5e7292c68b74926',
    COOKIE_MAX_AGE: process.env.COOKIE_MAX_AGE || '1h'
};
exports.default = config;
