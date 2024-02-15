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
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const mailer_1 = __importDefault(require("../config/mailer"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get('/verify', (req, res) => {
    try {
        const head = req.headers.authorization;
        const verificado = (0, jwt_1.authToken)(head, process.env.SECRET_KEY);
        if (verificado) {
            res.status(200).json(verificado);
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        res.json({ error: err });
    }
});
router.get('/verifyRefresh', (req, res) => {
    try {
        const head = req.headers.authorization;
        const verificado = (0, jwt_1.authToken)(head, process.env.SECRET_KEY_EMAIL);
        res.status(200).json(verificado);
    }
    catch (error) {
        res.json({ error: error });
    }
});
router.post('/loguear', (req, res) => {
    const cont = req.body;
    user_model_1.default.getOneXEmailXContra({
        usuEmail: cont.usuEmail,
    })
        .then((usuario) => __awaiter(void 0, void 0, void 0, function* () {
        if (usuario.length !== 0 && (yield bcrypt_1.default.compare(cont.usuContra, usuario[0].usuContra))) {
            try {
                const usuToken = (0, jwt_1.generateToken)(usuario, process.env.SECRET_KEY);
                res.status(200).json({ token: usuToken, pg: usuario.paginaRuta });
            }
            catch (err) {
                res.status(500).json({ error: 'No se pudo generar el token', message: err });
            }
        }
        else {
            res.status(400).json({
                error: 'Error de autenticación',
                message: 'No existe un usuario con las credenciales enviadas',
            });
        }
    }))
        .catch((err) => {
        res.status(500).json({ error: 'Acesso invalido Intentelo de Nuevo', message: err.message });
    });
});
router.post('/crearUsu', (req, res) => {
    const cont = req.body;
    user_model_1.default.create(Object.assign(Object.assign({}, cont), { usuIngreso: new Date(), perfilId: 2 }))
        .then((usuario) => {
        res.status(200).json({ response: usuario, message: 'Usuario creado exitosamente' });
    })
        .catch((error) => {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                error: 'Ya existe un usuario registrado con este numero de documento o correo electronico',
                message: error,
            });
        }
        else {
            res.status(401).json({
                error: 'Faltan credenciales para crear al usuario',
                message: error,
            });
        }
    });
});
router.post('/forgotPass', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cont = req.body;
        if (!(cont === null || cont === void 0 ? void 0 : cont.usuEmail)) {
            res.status(400).json({ error: 'No se enviaron los datos requeridos' });
        }
        const usuario = yield user_model_1.default.getOne({ usuEmail: cont.usuEmail });
        const { usuId, usuEmail, usuNoDoc } = usuario;
        const token = (0, jwt_1.generateToken)({ usuId, usuNoDoc, usuEmail }, process.env.SECRET_KEY_EMAIL);
        yield user_model_1.default.update({ usuKey: token, usuId: usuario.usuId });
        yield mailer_1.default.sendMail({
            from: '"Recuperar su contraseña" <jayVal029@gmail.com>',
            to: `${cont.usuEmail}`,
            subject: 'Haz solicitado una nueva contraseña',
            text: 'Pulsa el boton para recuperar tu contraseña',
            html: `<a href="${process.env.FRONT_URL}/reset/${token}">Click</a>`,
        });
        res.status(200).json({ message: `Correo enviado a ${cont.usuEmail}` });
    }
    catch (err) {
        console.error('Mailer', err.message);
        res.status(500).json({ error: 'No se pudo enviar el email', message: err.message });
    }
}));
router.post('/resetPass', (0, auth_1.verifyToken)(process.env.SECRET_KEY_EMAIL), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cont = req.body;
        const token = req.headers.authorization;
        const newContra = yield bcrypt_1.default.hash(cont.usuContra, 10);
        const usuInfo = (0, jwt_1.authToken)(token, process.env.SECRET_KEY_EMAIL);
        if (usuInfo) {
            const updated = yield user_model_1.default.update({ usuId: usuInfo.payload.usuId, usuContra: newContra, usuKey: null });
            if (updated) {
                res.status(200).json({ message: 'contraseña actualizada correctamente' });
            }
            else {
                res.status(500).json({ message: 'No se pudo actualizar la contraseña' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Ocurrió un problema al resetear la contraseña', error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=autenticacion.route.js.map