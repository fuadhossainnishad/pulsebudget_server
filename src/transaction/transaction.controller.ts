import { Request, Response } from "express";
import { retrieveTransactionService } from "./transaction.service";

export const retrievTransactionController = async (req: Request, res: Response) => {
    try {
        const transaction = await retrieveTransactionService()
        if (!transaction) {
            res.status(404).json({ massage: "Any transaction not found" })
        }
        res.status(200).json({ massage: "Transaction found", data: transaction })
        console.log(transaction)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
