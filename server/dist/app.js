"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const express_session_1 = __importDefault(require("express-session"));
const routes_1 = __importDefault(require("~/routes"));
const env_config_1 = __importDefault(require("~/configs/env.config"));
const logger_middleware_1 = require("./middlewares/logger.middleware");
const rateLimiter_middleware_1 = require("./middlewares/rateLimiter.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const errors_1 = require("./utils/errors");
function createApp() {
    // Config isProduction variable
    const isProduction = env_config_1.default.NODE_ENV === 'production';
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        credentials: true
    }));
    // config app
    app.use((0, morgan_1.default)('dev'));
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        secret: env_config_1.default.SESSION_SECRET,
        cookie: { maxAge: +env_config_1.default.COOKIE_MAX_AGE, secure: isProduction },
        resave: false,
        saveUninitialized: false
    }));
    // all routes
    app.use('/api/v1', routes_1.default);
    // Error handling & middlewares
    app.use(logger_middleware_1.loggerMiddleware);
    app.use(rateLimiter_middleware_1.rateLimiter);
    if (!isProduction) {
        app.use((0, errorhandler_1.default)());
    }
    app.use((req, res, next) => {
        next(new errors_1.NotFoundError(`Route ${req.originalUrl} not found`));
    });
    app.use(error_middleware_1.ErrorRequest);
    return app;
}
