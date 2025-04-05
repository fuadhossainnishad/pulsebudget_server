"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userRoutes = express_1.default.Router();
userRoutes.post('/create', user_controller_1.userCreateController);
userRoutes.post('/login', user_controller_1.userFindingController);
exports.default = userRoutes;
