"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(payload, secretKey) {
    try {
        const token = jsonwebtoken_1.default.sign({ payload }, secretKey, { expiresIn: '2h', algorithm: process.env.ALGORITHM });
        return token;
    }
    catch (error) {
        return error;
    }
}
exports.generateToken = generateToken;
function authToken(token, secretKey) {
    try {
        token = token.replace('Bearer ', '');
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (e) {
        console.error(e);
        return e;
    }
}
exports.authToken = authToken;
//# sourceMappingURL=jwt.js.map