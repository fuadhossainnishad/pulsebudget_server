import fs from 'fs';
import csvParser from 'csv-parser';
import BudgetModel, { BudgetInterface } from '../budget/budget.schema';
import { insertFileInfoService, isFileExistService } from './file.service';

export const extractCSV = async (path: string) => {
    const fileExist = await isFileExistService(path)
    if (fileExist) {
        console.log('file exist')
        return
    };
    console.log("now extracting CSV")
    const transactions: BudgetInterface[] = []
    fs.createReadStream(path)
        .pipe(csvParser())
        .on('data', (row: any) => {
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
                const fileInsert = await insertFileInfoService(path)
                if (fileInsert) {
                    console.log("File info inserted successfully")
                } else if (!fileInsert) {
                    console.log("Error inserting file info")
                }
                console.log("done extracting CSV")
            } catch (error) {
                console.error("Error inserting data:", error);

            }
        })
}



