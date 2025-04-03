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
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = require("./env.config");
const extractCSV_1 = require("../lib/extractCSV");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, '../../public/files/dataset_company_budget_allocation_dashboard.csv');
const databaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_config_1.envConfig.databaseUrl);
        console.log("Connected to database");
        console.log("now extracting CSV");
        yield (0, extractCSV_1.extractCSV)(filePath);
        console.log("done extracting CSV");
    }
    catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
});
exports.default = databaseConnection;
