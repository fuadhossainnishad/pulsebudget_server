import { match } from "assert"
import BudgetModel from './budget.schema';

export const filteredBudgetDataService = async (matchFields: { Subsidiary?: string; Sector?: string }
) => {

    const budgetData = await BudgetModel.aggregate([
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
    ])

    const subsidiaryData = matchFields.hasOwnProperty("Subsidiary") ? await BudgetModel.aggregate([
        { $match: { Subsidiary: matchFields.Subsidiary } },

        {
            $group: {
                _id: "$Subsidiary",
                totalAllocatedBudget: { $sum: "$Allocated_Budget" },
                totalSpentAmount: { $sum: "$Spent_Amount" },
                totalRemainBudget: { $sum: "$Remaining_Budget" }
            }
        },
    ]) : []

    const sectorData = matchFields.hasOwnProperty('Sector') ? await BudgetModel.aggregate([
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
    ]) : []

    const result = {
        filtered: budgetData || [],
        subsidiary: subsidiaryData || [],
        sector: sectorData || []
    };

    // Return null if all aggregations are empty or undefined
    if (
        (!budgetData || budgetData.length === 0) &&
        (!subsidiaryData || subsidiaryData.length === 0) &&
        (!sectorData || sectorData.length === 0)
    ) {
        console.log('No data found for matchFields:', matchFields);
        return null;
    }

    console.log('Filtered data result:', result);
    return result;
}

export const budgetDataService = async () => {
    const budgetData = await BudgetModel.aggregate([
        {
            $group: {
                _id: "total",
                totalAllocatedBudget: { $sum: "$Allocated_Budget" },
                totalSpentAmount: { $sum: "$Spent_Amount" },
                totalRemainBudget: { $sum: "$Remaining_Budget" }
            }
        },
    ])

    const subsidiary = await BudgetModel.aggregate([
        {
            $group: {
                _id: "$Subsidiary",
                totalAllocatedBudget: { $sum: "$Allocated_Budget" },
                totalSpentAmount: { $sum: "$Spent_Amount" },
                totalRemainBudget: { $sum: "$Remaining_Budget" }
            }
        },
        { $sort: { _id: 1 } }
    ])

    if (!budgetData || !subsidiary) {
        return !!budgetData || !!subsidiary
    }
    return { "budget": budgetData, "subsidiary": subsidiary }
}

export const fieldsFindService = async () => {
    const subsidiary = await BudgetModel.distinct("Subsidiary")
    const sector = await BudgetModel.distinct("Sector")

    return { subsidiary, sector }
}