"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_config_1 = __importDefault(require("./config/database.config"));
const env_config_1 = require("./config/env.config");
(0, database_config_1.default)();
const port = env_config_1.envConfig.port;
app_1.default.listen(port, async () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
