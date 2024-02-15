"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(secretKey = process.env.SECRET_KEY) {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "The authorization token wasn't sended" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (decoded)
            next();
        else
            res.status(400).json({ error: 'Sesión expirada', message: 'Vuelva a inciar sesión' });
    };
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map