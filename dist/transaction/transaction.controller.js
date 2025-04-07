"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrievTransactionController = void 0;
const transaction_service_1 = require("./transaction.service");
const retrievTransactionController = async (req, res) => {
    try {
        const transaction = await (0, transaction_service_1.retrieveTransactionService)();
        if (!transaction) {
            res.status(404).json({ massage: "Any transaction not found" });
        }
        res.status(200).json({ massage: "Transaction found", data: transaction });
        console.log(transaction);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.retrievTransactionController = retrievTransactionController;
