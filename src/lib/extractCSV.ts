import csv from 'csv-parser';
import fs from 'fs';
import { envConfig } from '../config/env.config';
import BudgetModel, { BudgetInterface } from '../budget/budget.schema';
import FileModel from './file.schema';
import mongoose from 'mongoose';


export const isFileExist = async (path: string): Promise<boolean> => {
    const isExist = await FileModel.findOne({ fileName: path })
    return !!isExist
}

export const extractCSV = async (path: string) => {
    const fileExist = await isFileExist(path)
    if (fileExist) {
        console.log('file exist')
        return};
    const transactions: BudgetInterface[] = []
    fs.createReadStream(path)
        .pipe(csv())
        .on('data', (row) => {
            const transaction = new BudgetModel({
                Transaction_ID: row.Transaction_ID,
                Date: new Date(row.Date),
                Subsidiary: row.Subsidiary,
                Sector: row.Sector,
                User_ID: row.User_ID,
                Allocated_Budget: row.Allocated_Budget,
                Spent_Amount: row.Spent_Amount,
                Remaining_Budget: row.Remaining_Budget,
                Revenue_Generated: row.Revenue_Generated,
                Transaction_Type: row.Transaction_Type,
            })
            transactions.push(transaction as BudgetInterface)
            console.log('CSV data successfully pushdown')

        })
        .on('end', async () => {
            try {
                console.log('CSV data successfully importing start')
                await BudgetModel.insertMany(transactions)
                console.log('CSV data successfully imported')
                mongoose.connection.close()
            } catch (error) {
                console.error("Error inserting data:", error);

            }
        })
}



