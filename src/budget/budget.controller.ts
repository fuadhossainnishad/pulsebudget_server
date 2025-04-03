import { Request, Response } from "express";
import { budgetDataService, filteredBudgetDataService } from "./budget.service";

export const filteredBudgetDataController = async (req: Request, res: Response) => {
    try {
        const { subsidiary, sector } = req.query
        let matchFields: Record<string, string> = {}
        if (typeof subsidiary === 'string') matchFields.subsidiary = subsidiary;
        if (typeof sector === 'string') matchFields.sector = sector;
        const budgetData = await filteredBudgetDataService(matchFields)
        if (!budgetData) {
             res.status(404).json({ message: 'Budget data not found' });
        }
         res.status(200).json({ message: "Budget Data", data: budgetData });
    } catch (error) {
         res.status(500).json({ error: "Internal Server Error" });
    }
}

export const budgetDataController = async (req: Request, res: Response) => {
    try {
        const budgetData = await budgetDataService()
        if (!budgetData) {
             res.status(404).json({ message: 'Budget data not found' });
        }
         res.status(200).json({ message: "Budget Data", data: budgetData });
    } catch (error) {
         res.status(500).json({ error: "Internal Server Error" });
    }
}
