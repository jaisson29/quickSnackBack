"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const transac_model_1 = __importDefault(require("../models/transac.model"));
const detVenta_model_1 = __importDefault(require("../models/detVenta.model"));
const router = express_1.default.Router();
router.get('/getAll', (0, auth_1.verifyToken)(process.env.SECRET_KEY), function (req, res) {
    transac_model_1.default.getAll()
        .then(function (resultado) {
        res.json(resultado);
    })
        .catch(function (err) {
        res.status(500).json({ error: err.message, mensaje: err.name, codigo: err.cod });
    });
});
router.get('/getByUser/:usuId', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => {
    const cont = req.params;
    transac_model_1.default.getByUser(cont)
        .then((respuesta) => {
        res.status(200).json(respuesta);
    })
        .catch((err) => {
        res.status(500).json({ error: err.message, mensaje: err.name, codigo: err.cod });
    });
});
//Endpoint para crear una transaccion
router.post('/', (0, auth_1.verifyToken)(process.env.SECRET_KEY), function (req, res) {
    const { usuId, transacTipo, det } = req.body;
    transac_model_1.default.create({ usuId, transacTipo, transacFecha: new Date() })
        .then((result) => {
        console.log("1", result);
        const { insertId } = result;
        detVenta_model_1.default.create({ transacId: insertId, det })
            .then((result) => {
            console.log("2", result);
            res.status(200).json(result);
        })
            .catch((err) => {
            res.status(500).json({ error: 'Fallo en la creacion del detalle', message: err.message });
        });
    })
        .catch((err) => {
        res.json(err);
    });
});
exports.default = router;
//# sourceMappingURL=transac.router.js.map