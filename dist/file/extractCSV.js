"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const budget_schema_1 = __importDefault(require("../budget/budget.schema"));
const file_service_1 = require("./file.service");
const extractCSV = async (path) => {
    const fileExist = await (0, file_service_1.isFileExistService)(path);
    if (fileExist) {
        console.log('file exist');
        return;
    }
    ;
    console.log("now extracting CSV");
    const transactions = [];
    fs_1.default.createReadStream(path)
        .pipe((0, csv_parser_1.default)())
        .on('data', (row) => {
        const transaction = new budget_schema_1.default({
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
        });
        transactions.push(transaction);
        console.log('CSV data successfully pushdown');
    })
        .on('end', async () => {
        try {
            console.log('CSV data successfully importing start');
            await budget_schema_1.default.insertMany(transactions);
            console.log('CSV data successfully imported');
            const fileInsert = await (0, file_service_1.insertFileInfoService)(path);
            if (fileInsert) {
                console.log("File info inserted successfully");
            }
            else if (!fileInsert) {
                console.log("Error inserting file info");
            }
            console.log("done extracting CSV");
        }
        catch (error) {
            console.error("Error inserting data:", error);
        }
    });
};
exports.extractCSV = extractCSV;
