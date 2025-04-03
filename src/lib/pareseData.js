"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formateDecimal = void 0;
const formateDecimal = (value) => {
    return parseFloat(parseInt(value).toFixed(2));
};
exports.formateDecimal = formateDecimal;
