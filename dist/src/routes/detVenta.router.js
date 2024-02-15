"use strict";
/** @format */
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
const detVenta_model_1 = __importDefault(require("../models/detVenta.model"));
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
//Obtener todas los detalles
router.get('/', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = detVenta_model_1.default.getAll();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ error: 'Fallo en obtener los detalles', message: err });
    }
}));
router.get('/:transacId', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cont = req.params;
        const result = yield detVenta_model_1.default.getAllXTrsId(cont);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ error: 'Fallo en obtener los detalles', message: err });
    }
}));
exports.default = router;
//# sourceMappingURL=detVenta.router.js.map