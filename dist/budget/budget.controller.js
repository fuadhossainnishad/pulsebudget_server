"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsFindController = exports.budgetDataController = exports.filteredBudgetDataController = void 0;
const budget_service_1 = require("./budget.service");
const filteredBudgetDataController = async (req, res) => {
    try {
        const { subsidiary, sector } = req.query;
        console.log(subsidiary, sector);
        let matchFields = {};
        if (typeof subsidiary === 'string')
            matchFields.Subsidiary = subsidiary;
        if (typeof sector === 'string')
            matchFields.Sector = sector;
        console.log(matchFields);
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
const fieldsFindController = async (req, res) => {
    try {
        const fields = await (0, budget_service_1.fieldsFindService)();
        if (!fields) {
            res.status(404).json({ message: 'Fields not found' });
        }
        console.log(fields);
        res.status(200).json({ message: "Fields lists", fields: fields });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.fieldsFindController = fieldsFindController;
