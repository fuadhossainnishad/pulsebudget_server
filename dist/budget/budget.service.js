"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetDataService = exports.filteredBudgetDataService = void 0;
const budget_schema_1 = __importDefault(require("./budget.schema"));
const filteredBudgetDataService = async (matchFields) => {
    const budgetData = await budget_schema_1.default.aggregate([
        { $match: matchFields },
        {
            $group: {
                _id: { subsidiary: "$subsidiary", sector: "$sector" },
                totalAllocatedBudget: { $sum: "$Allocated_Budget" },
                totalSpentAmount: { $sum: "$Spent_Amount" },
                totalRemainBudget: { $sum: "$Remaining_Budget" }
            }
        },
        { $sort: { totalAllocatedBudget: -1 } }
    ]);
    if (!budgetData) {
        return !!budgetData;
    }
    return budgetData;
};
exports.filteredBudgetDataService = filteredBudgetDataService;
const budgetDataService = async () => {
    const budgetData = await budget_schema_1.default.aggregate([
        {
            $group: {
                _id: "total",
                totalAllocatedBudget: { $sum: "$Allocated_Budget" },
                totalSpentAmount: { $sum: "$Spent_Amount" },
                totalRemainBudget: { $sum: "$Remaining_Budget" }
            }
        },
    ]);
    if (!budgetData) {
        return !!budgetData;
    }
    return budgetData;
};
exports.budgetDataService = budgetDataService;
