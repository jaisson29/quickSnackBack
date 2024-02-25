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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const transac_model_1 = __importDefault(require("../models/transac.model"));
const detVenta_model_1 = __importDefault(require("../models/detVenta.model"));
const router = express_1.default.Router();
//Endpoint para crear una transaccion
router.post('/', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cont = req.body;
        const { usuId, transacTipo, det } = cont;
        if (!usuId || !transacTipo || !det) {
            throw new Error('Faltan datos');
        }
        const transacData = {
            usuId: usuId,
            transacTipo: transacTipo,
            transacFecha: new Date(Date.now()),
            det: det,
        };
        const transacResult = yield transac_model_1.default.create(transacData);
        const { insertId } = transacResult;
        const detVentaResult = yield detVenta_model_1.default.create({ transacId: insertId, det });
        console.log(detVentaResult);
        res.status(200).json({ message: `Transaccion realizada correctamente con ${det.length} productos}` });
    }
    catch (_error) {
        res.status(500).json({ message: 'Ocurrio un error al crear la transacción', error: _error.message });
    }
}));
router.get('/getAll', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield transac_model_1.default.getAll();
        res.status(200).json(results);
    }
    catch (_error) {
        console.error(_error);
        const resError = {
            message: (_error === null || _error === void 0 ? void 0 : _error.message) || 'Ocurrió un error inesperado al obtener los datos',
            error: _error === null || _error === void 0 ? void 0 : _error.code,
        };
        res.status(500).json(resError);
    }
}));
router.get('/getByUser/:usuId', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => {
    const cont = req.params;
    transac_model_1.default.getByUser(Number(cont.usuId))
        .then((respuesta) => {
        if (respuesta.length === 0) {
            res.status(204).json(respuesta);
        }
        else {
            res.status(200).json(respuesta);
        }
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message, mensaje: err.name, codigo: err.cod });
    });
});
router.put('/', () => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = router;
//# sourceMappingURL=transac.router.js.map