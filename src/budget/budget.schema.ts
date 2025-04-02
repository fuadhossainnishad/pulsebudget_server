import mongoose, { Schema, Document } from "mongoose";
import { formateDecimal } from "../lib/pareseData";

export interface BudgetInterface extends Document {
    Transaction_ID: string;
    Date: Date;
    Subsidiary: string;
    Sector: string;
    User_ID: string;
    Allocated_Budget: number;
    Spent_Amount: number;
    Remaining_Budget: number;
    Revenue_Generated: number;
    Transaction_Type: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const BudgetSchema = new Schema<BudgetInterface>(
    {
        Transaction_ID: { type: String, required: true },
        Date: { type: Date, required: true },
        Subsidiary: { type: String, required: true },
        Sector: { type: String, required: true },
        User_ID: { type: String, required: true },
        Allocated_Budget: { type: Number, required: true, set: formateDecimal },
        Spent_Amount: { type: Number, required: true, set: formateDecimal },
        Remaining_Budget: { type: Number, required: true, set: formateDecimal },
        Revenue_Generated: { type: Number, required: true, set: formateDecimal },
        Transaction_Type: { type: String, required: true },
    },
    {
        timestamps: true,
        toJSON: { getters: true },
    }
);

const BudgetModel = mongoose.model<BudgetInterface>("Budget", BudgetSchema);

export default BudgetModel;
