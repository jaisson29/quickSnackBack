"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        cb(null, `prod_${req.body.prodId}.${ext}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.get('/getAll', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => {
    user_model_1.default.getAll()
        .then((users) => {
        res.status(200).json(users);
    })
        .catch((error) => {
        res.status(400).json({
            error: 'Fallo en intentar obtener los usuarios',
            mesage: error,
        });
    });
});
router.post('/getOne', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => {
    const cont = req.body;
    user_model_1.default.getOne(cont)
        .then((user) => {
        if (user.length === 0)
            res.status(500).json({ message: 'fallo en obtener el resultado' });
        else
            res.status(200).json(user);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Fallo en intentar buscar al usuario', message: err });
    });
});
router.post('/crear', (0, auth_1.verifyToken)(process.env.SECRET_KEY), upload.single('usuImg'), (req, res) => {
    var _a, _b;
    const cont = req.body;
    const imgPath = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname) !== null && _b !== void 0 ? _b : (cont.usuGen === 1 ? 'icon-male-100-png' : 'icon-female-100.png');
    const usuData = Object.assign(Object.assign({}, cont), { usuImg: imgPath });
    user_model_1.default.create(usuData)
        .then((respuesta) => {
        res.status(200).json({ message: respuesta });
    })
        .catch((err) => {
        res.status(400).json({ error: 'No se pudo crear al usuario', message: err });
    });
});
router.put('/actualizar', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => {
    const cont = req.body;
    user_model_1.default.update(cont)
        .then((respuesta) => {
        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            content: respuesta,
        });
    })
        .catch((err) => {
        res.status(500).json({ error: 'No se pudo actualizar a el usuario', message: err.message });
    });
});
// http://localhost:5000/api/usuario/borrar/#
router.delete('/borrar/:usuId', (0, auth_1.verifyToken)(process.env.SECRET_KEY), (req, res) => {
    const cont = req.params;
    user_model_1.default.delete(cont)
        .then((respuesta) => {
        res.status(200).json({
            message: 'Usuario eliminado',
            content: respuesta,
        });
    })
        .catch((err) => {
        res.status(400).json({
            error: 'Error al eliminar al usuario',
            message: err,
        });
    });
});
exports.default = router;
//# sourceMappingURL=user.route.js.map