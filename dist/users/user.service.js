"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFindingService = void 0;
const hashPassword_1 = require("../lib/hashPassword");
const user_schema_1 = __importDefault(require("./user.schema"));
const userFindingService = async (email, password, role) => {
    const user = await user_schema_1.default.findOne({ email, role });
    if (!user) {
        return !!user;
    }
    if (user.password === (await (0, hashPassword_1.hashPassword)(password))) {
        return user;
    }
    return !!user;
};
exports.userFindingService = userFindingService;
