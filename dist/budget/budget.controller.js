"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetDataController = exports.filteredBudgetDataController = void 0;
const budget_service_1 = require("./budget.service");
const filteredBudgetDataController = async (req, res) => {
    try {
        const { subsidiary, sector } = req.query;
        let matchFields = {};
        if (typeof subsidiary === 'string')
            matchFields.subsidiary = subsidiary;
        if (typeof sector === 'string')
            matchFields.sector = sector;
        const budgetData = await (0, budget_service_1.filteredBudgetDataService)(matchFields);
        if (!budgetData) {
            res.status(404).json({ message: 'Budget data not found' });
        }
        res.status(200).json({ message: "Budget Data", data: budgetData });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.filteredBudgetDataController = filteredBudgetDataController;
const budgetDataController = async (req, res) => {
    try {
        const budgetData = await (0, budget_service_1.budgetDataService)();
        if (!budgetData) {
            res.status(404).json({ message: 'Budget data not found' });
        }
        res.status(200).json({ message: "Budget Data", data: budgetData });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.budgetDataController = budgetDataController;
