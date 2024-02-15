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
const product_model_1 = __importDefault(require("../models/product.model"));
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.get('/getAll', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.getAll();
        res.json(products);
    }
    catch (error) {
        res.json({ code: 500, error: 'Failed to load the products' });
    }
}));
router.get('/getAll/:catId', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cont = req.params;
    try {
        product_model_1.default.getAllXCat(cont)
            .then((result) => {
            res.status(200).json(result);
        })
            .catch((err) => {
            res.status(500).json({ error: err.message, mensaje: err.name });
        });
    }
    catch (error) {
        res.json({ code: 500, error: 'Algo fallo en obtener los productos por esta categoria' });
    }
}));
router.get('/getVenXProd', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        product_model_1.default.getVenXProd()
            .then((result) => {
            res.status(200).json(result);
        })
            .catch((err) => {
            res.json({ error: err.message, mensaje: err.name, codigo: err.cod });
        });
    }
    catch (error) {
        res.json({ code: 500, error: 'Fallo en encontrar las relaciones' });
    }
}));
router.post('/create', (0, auth_1.verifyToken)(process.env.SECRET_KEY), upload.single('prodImg'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cont = req.body;
    const imgPath = req.file ? req.file.originalname : 'default-img.webp';
    const prodData = Object.assign(Object.assign({}, cont), { prodImg: imgPath });
    product_model_1.default.create(prodData)
        .then((create) => {
        res.json(create);
    })
        .catch((err) => {
        res.json({
            code: 500,
            error: 'Failed to create a new product',
            message: err,
        });
    });
}));
router.put('/update', (0, auth_1.verifyToken)(process.env.SECRET_KEY), upload.single('usuImg'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cont = req.body;
    const imgPath = req.file ? req.file.originalname : cont.usuImg;
    const newProdData = Object.assign(Object.assign({}, cont), { usuImg: imgPath });
    try {
        const update = yield product_model_1.default.update(newProdData);
        res.json(update);
    }
    catch (error) {
        res.json('Failed to update the product');
    }
}));
router.delete('/delete/:prodId', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cont = req.params;
    try {
        const del = yield product_model_1.default.delete({
            prodId: cont.prodId,
        });
        res.json(del);
    }
    catch (error) {
        res.json('Failed to delete the product');
    }
}));
exports.default = router;
//# sourceMappingURL=product.route.js.map