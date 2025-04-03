"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertFileInfoService = exports.isFileExistService = void 0;
const file_schema_1 = __importDefault(require("./file.schema"));
const isFileExistService = async (path) => {
    const isExist = await file_schema_1.default.findOne({ fileName: path });
    return !!isExist;
};
exports.isFileExistService = isFileExistService;
const insertFileInfoService = async (fileName) => {
    const fileInfo = await (0, exports.isFileExistService)(fileName);
    if (fileInfo) {
        return !!fileInfo;
    }
    const fileInfoInsert = await file_schema_1.default.insertOne({ fileName });
    if (!fileInfoInsert) {
        return !!fileInfoInsert;
    }
    return fileInfoInsert;
};
exports.insertFileInfoService = insertFileInfoService;
