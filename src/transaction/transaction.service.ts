import BudgetModel from "../budget/budget.schema";
import { TransactionInterface } from "./transaction.schema";

export const retrieveTransactionService = async (): Promise<TransactionInterface[]> => {
    const transaction = await BudgetModel.aggregate([
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
    ]
    )

    return transaction
}