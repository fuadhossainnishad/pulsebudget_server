import BudgetModel from "./budget.schema"

export const filteredBudgetDataService = async (matchFields: Object) => {
    const budgetData = await BudgetModel.aggregate([
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
    ])

    if (!budgetData) {
        return !!budgetData
    }
    return budgetData
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

    if (!budgetData) {
        return !!budgetData
    }
    return budgetData
}