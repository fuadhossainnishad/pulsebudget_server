"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
const transactionRoute = express_1.default.Router();
transactionRoute.get("/transaction", transaction_controller_1.retrievTransactionController);
exports.default = transactionRoute;
