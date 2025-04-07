"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveTransactionService = void 0;
const budget_schema_1 = __importDefault(require("../budget/budget.schema"));
const retrieveTransactionService = async () => {
    const transaction = await budget_schema_1.default.aggregate([
        {
            $project: {
                Transaction_ID: 1,
                Date: 1,
                Subsidiary: 1,
                Sector: 1,
                User_ID: 1,
                Transaction_Type: 1,
                createdAt: 1,
                updatedAt: 1,
                _id: 0,
            }
        }
    ]);
    return transaction;
};
exports.retrieveTransactionService = retrieveTransactionService;
