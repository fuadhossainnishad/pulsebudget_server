import express from 'express';
import { retrievTransactionController } from './transaction.controller';
const transactionRoute = express.Router()

transactionRoute.get("/transaction", retrievTransactionController)

export default transactionRoute