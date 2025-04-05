"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const budget_controller_1 = require("./budget.controller");
const budgetRoute = express_1.default.Router();
budgetRoute.get('/dashboard', budget_controller_1.budgetDataController);
budgetRoute.get('/filter', budget_controller_1.filteredBudgetDataController);
budgetRoute.get('/fields', budget_controller_1.fieldsFindController);
exports.default = budgetRoute;
