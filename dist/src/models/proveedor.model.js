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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
class ProveedorModel {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
		INSERT INTO proveedor (provNom, provNit) 
		VALUES (?, ?);
		`;
            const { provNom, provNit } = data;
            db_1.db.query(query, [provNom, provNit], (_error, result) => {
                if (_error)
                    throw _error;
                if (result.affectedRows === 1)
                    return result;
            });
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
		SELECT provId, provNom, provNit FROM proveedor;
		`;
            db_1.db.query(query, (_error, result) => {
                if (_error)
                    throw _error;
                return result;
            });
        });
    }
    static getOne() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static update() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static delete() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = ProveedorModel;
//# sourceMappingURL=proveedor.model.js.map