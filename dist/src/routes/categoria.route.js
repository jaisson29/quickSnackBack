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
const mcat_1 = __importDefault(require("../models/mcat"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get('/getAll', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield mcat_1.default.getAll();
        res.json(categorias);
    }
    catch (error) {
        res.json(error);
    }
}));
router.post('/create', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cont = req.body;
    mcat_1.default.create(cont)
        .then((create) => {
        res.json(create);
    })
        .catch((error) => {
        res.json({
            code: 500,
            error: 'Fallo la creacion de la categoria',
            message: error,
        });
    });
}));
router.put('/update', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cont = req.body;
    try {
        const update = yield mcat_1.default.update(cont);
        res.json(update);
    }
    catch (error) {
        res.json('Fallo la actualizacion de la categoria');
    }
}));
router.delete('/delete/:catId', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cont = req.params;
    try {
        const del = yield mcat_1.default.delete({
            catId: cont.catId,
        });
        res.json(del);
    }
    catch (error) {
        res.json('Fallo al eliminar la categoria');
    }
}));
router.get('/getmxp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mcat_1.default.getMxP().then((result) => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
}));
exports.default = router;
//# sourceMappingURL=categoria.route.js.map