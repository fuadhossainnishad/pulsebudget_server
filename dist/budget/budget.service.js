"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsFindService = exports.budgetDataService = exports.filteredBudgetDataService = void 0;
const budget_schema_1 = __importDefault(require("./budget.schema"));
const filteredBudgetDataService = async (matchFields) => {
    const budgetData = await budget_schema_1.default.aggregate([
        { $match: matchFields },
        {
            $group: {
                _id: { subsidiary: "$Subsidiary", sector: "$Sector" },
                totalAllocatedBudget: { $sum: "$Allocated_Budget" },
                totalSpentAmount: { $sum: "$Spent_Amount" },
                totalRemainBudget: { $sum: "$Remaining_Budget" }
            }
        },
        // { $sort: { totalAllocatedBudget: -1 } }
    ]);
    const subsidiaryData = matchFields.hasOwnProperty("Subsidiary") ? await budget_schema_1.default.aggregate([
        { $match: { Subsidiary: matchFields.Subsidiary } },
        {
            $group: {
                _id: "$Subsidiary",
                totalAllocatedBudget: { $sum: "$Allocated_Budget" },
                totalSpentAmount: { $sum: "$Spent_Amount" },
                totalRemainBudget: { $sum: "$Remaining_Budget" }
            }
        },
    ]) : [];
    const sectorData = matchFields.hasOwnProperty('Sector') ? await budget_schema_1.default.aggregate([
        { $match: { Sector: matchFields.Sector } },
        {
            $group: {
                _id: "$Sector",
                totalAllocatedBudget: { $sum: "$Allocated_Budget" },
                totalSpentAmount: { $sum: "$Spent_Amount" },
                totalRemainBudget: { $sum: "$Remaining_Budget" }
            }
        },
        // { $sort: { totalAllocatedBudget: -1 } }
    ]) : [];
    const result = {
        filtered: budgetData || [],
        subsidiary: subsidiaryData || [],
        sector: sectorData || []
    };
    // Return null if all aggregations are empty or undefined
    if ((!budgetData || budgetData.length === 0) &&
        (!subsidiaryData || subsidiaryData.length === 0) &&
        (!sectorData || sectorData.length === 0)) {
        console.log('No data found for matchFields:', matchFields);
        return null;
    }
    console.log('Filtered data result:', result);
    return result;
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
    const subsidiary = await budget_schema_1.default.aggregate([
        {
            $group: {
                _id: "$Subsidiary",
                totalAllocatedBudget: { $sum: "$Allocated_Budget" },
                totalSpentAmount: { $sum: "$Spent_Amount" },
                totalRemainBudget: { $sum: "$Remaining_Budget" }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    if (!budgetData || !subsidiary) {
        return !!budgetData || !!subsidiary;
    }
    return { "budget": budgetData, "subsidiary": subsidiary };
};
exports.budgetDataService = budgetDataService;
const fieldsFindService = async () => {
    const subsidiary = await budget_schema_1.default.distinct("Subsidiary");
    const sector = await budget_schema_1.default.distinct("Sector");
    return { subsidiary, sector };
};
exports.fieldsFindService = fieldsFindService;
