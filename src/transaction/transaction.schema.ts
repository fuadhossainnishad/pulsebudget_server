import { Schema } from "mongoose";
import { BudgetInterface } from "../budget/budget.schema";

export interface TransactionInterface
    extends Omit<BudgetInterface,
        'Allocated_Budget' |
        'Spent_Amount' |
        'Remaining_Budget' |
        'Revenue_Generated'> { }
