"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = require("./env.config");
const extractCSV_1 = require("../file/extractCSV");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, '../../public/files/dataset_company_budget_allocation_dashboard.csv');
const databaseConnection = async () => {
    try {
        await mongoose_1.default.connect(env_config_1.envConfig.databaseUrl);
        console.log("Connected to database");
        await (0, extractCSV_1.extractCSV)(filePath);
    }
    catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
};
exports.default = databaseConnection;
