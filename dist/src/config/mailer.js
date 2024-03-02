"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAILAPI_USER,
        pass: process.env.EMAILAPI_PASS,
    }
});
transporter.verify(() => {
    console.log('Ready');
});
exports.default = transporter;
//# sourceMappingURL=mailer.js.map