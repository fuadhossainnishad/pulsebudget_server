"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./users/user.routes"));
const budget_routes_1 = __importDefault(require("./budget/budget.routes"));
const env_config_1 = require("./config/env.config");
const transaction_routes_1 = __importDefault(require("./transaction/transaction.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const url = env_config_1.envConfig.url;
console.log(url);
app.use((0, cors_1.default)({
    origin: url,
    credentials: true,
    methods: '*',
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use('/', user_routes_1.default);
app.use('/', budget_routes_1.default);
app.use('/', transaction_routes_1.default);
exports.default = app;
