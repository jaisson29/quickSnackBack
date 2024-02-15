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
const perfil_model_1 = __importDefault(require("../models/perfil.model"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get('/getAll', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const perfiles = yield perfil_model_1.default.getAll();
        res.json(perfiles);
    }
    catch (error) {
        res.json(error);
    }
}));
router.post('/create', (0, auth_1.verifyToken)(process.env.SECRECT_KEY), () => __awaiter(void 0, void 0, void 0, function* () { }));
exports.default = router;
//# sourceMappingURL=perfil.route.js.map