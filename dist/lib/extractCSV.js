"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCSV = exports.isFileExist = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const budget_schema_1 = __importDefault(require("../budget/budget.schema"));
const file_schema_1 = __importDefault(require("./file.schema"));
const mongoose_1 = __importDefault(require("mongoose"));
const isFileExist = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield file_schema_1.default.findOne({ fileName: path });
    return !!isExist;
});
exports.isFileExist = isFileExist;
const extractCSV = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const fileExist = yield (0, exports.isFileExist)(path);
    if (fileExist) {
        console.log('file exist');
        return;
    }
    ;
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
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('CSV data successfully importing start');
            yield budget_schema_1.default.insertMany(transactions);
            console.log('CSV data successfully imported');
            mongoose_1.default.connection.close();
        }
        catch (error) {
            console.error("Error inserting data:", error);
        }
    }));
});
exports.extractCSV = extractCSV;
