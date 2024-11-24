"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 5000;
const app = (0, app_1.createApp)();
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server is shutting down');
    });
});
