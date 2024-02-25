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
const valor_model_1 = __importDefault(require("../models/valor.model"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//create endpoint
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cont = req.body;
        const result = yield valor_model_1.default.create(cont);
        if (!result.insertId)
            throw new Error('No se pudo crear el valor');
        res.status(201).json({ msg: `Valor con ID ${result.insertId} creado correctamente` });
    }
    catch (_error) {
        console.error(_error);
        const resError = {
            message: (_error === null || _error === void 0 ? void 0 : _error.message) || 'Ocurrió un error inesperado al crear el Valor',
            error: _error === null || _error === void 0 ? void 0 : _error.code,
        };
        return res.status(500).json(resError);
    }
}));
// getAll endpoint
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Valores = yield valor_model_1.default.getAll();
        return res.status(200).json(Valores);
    }
    catch (_error) {
        console.error(_error);
        const resError = {
            message: 'Hubo un error obteniendo la informacion del Valor',
            error: _error === null || _error === void 0 ? void 0 : _error.message,
        };
        return res.status(500).json(resError);
    }
}));
// getOne endpoint
router.get('/:valorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cont = req.params;
        const Valor = yield valor_model_1.default.getOne(Number(cont.valorId));
        if (!Valor)
            res.status(404).send('Valor no encontrado');
        res.status(200).json(Valor[0]);
    }
    catch (_error) {
        console.error(_error);
        const resError = {
            message: 'Hubo un error obteniendo la informacion del Valor',
            error: _error === null || _error === void 0 ? void 0 : _error.message,
        };
        res.status(500).json(resError);
    }
}));
// update endpoint
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cont = req.body;
        const result = yield valor_model_1.default.update(cont);
        res.status(200).json({ message: `Se ha actializado ${result.affectedRows} Valor correctamente` });
    }
    catch (_error) {
        console.error(_error);
        const resError = {
            message: _error.message,
            error: _error.name,
        };
        res.status(500).json(resError);
    }
}));
// delete endpoint
router.delete('/:valorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cont = req.params;
        const result = yield valor_model_1.default.delete(Number(cont.valorId));
        res.status(200).json({ message: `${result.affectedRows} registro eliminado.` });
    }
    catch (_error) {
        console.error(_error);
        const resError = {
            message: _error.message,
            error: _error.name,
        };
        res.status(500).json(resError);
    }
}));
exports.default = router;
//# sourceMappingURL=valor.router.js.map