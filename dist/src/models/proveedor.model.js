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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
class ProveedorModel {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
		INSERT INTO proveedor (provNom, provNit) 
		VALUES (?, ?);
		`;
            const { provNom, provNit } = data;
            const [result] = yield db_1.pool.query(sql, [provNom, provNit]);
            if (result.affectedRows !== 1) {
                const _error = {
                    name: 'MysqlError',
                    code: 'ER_NOT_CREATED_ERROR',
                    message: 'Ocurrió un error al crear el registro en la base de datos',
                    fatal: false,
                    errno: 501,
                };
                throw _error;
            }
            return result;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
		SELECT provId, provNom, provNit FROM proveedor;
		`;
            const results = yield db_1.pool.query(sql);
            if (!(results === null || results === void 0 ? void 0 : results.length)) {
                const _error = {
                    message: 'No se encontró el proveedor',
                    name: 'NotFoundError',
                    code: 'NOTFOUND_PROVEEDOR',
                    fatal: false,
                    errno: 502,
                };
                throw _error;
            }
            return results[0];
        });
    }
    static getOne(provId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
			SELECT provId, provNom, provNit FROM proveedor WHERE provId=?;
			`;
            const [result] = yield db_1.pool.query(sql, [provId]);
            if (!(result === null || result === void 0 ? void 0 : result.length)) {
                const _error = {
                    message: 'No se encontró el proveedor',
                    name: 'NotFoundError',
                    code: 'NOTFOUND_PROVEEDOR',
                    fatal: false,
                    errno: 502,
                };
                throw _error;
            }
            return result;
        });
    }
    static update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = Object.assign({}, data);
            const { provId } = updateData, fieldsToUpdate = __rest(updateData, ["provId"]);
            if (!provId) {
                const noDataError = {
                    message: 'No se pudo actualizar al proveedor',
                    code: 'NotIdSendError',
                    name: 'NOT_DATA_SEND',
                    fatal: false,
                    errno: 503,
                };
                throw noDataError;
            }
            const seteos = Object.keys(fieldsToUpdate)
                .map((field) => `${field} = ?`)
                .join(', ');
            const values = Object.values(fieldsToUpdate);
            const sql = `
			UPDATE proveedor SET ${seteos} WHERE provId=?;
		`;
            const [result] = yield db_1.pool.query(sql, [...values, provId]);
            if (result.affectedRows === 0) {
                const _error = {
                    message: 'No se pudo actualizar al proveedor',
                    name: 'NotUpdateError',
                    code: 'NOTUPDATE_PROVEEDOR',
                    fatal: false,
                    errno: 503,
                };
                throw _error;
            }
            return result;
        });
    }
    static delete(provId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
			DELETE FROM proveedor WHERE provId = ?
		`;
            const [result] = yield db_1.pool.query(sql, [provId]);
            if (result.affectedRows === 0) {
                const _error = {
                    message: 'No se puede eliminar el proveedor',
                    name: 'NotDeleteError',
                    code: 'NOT_DELETE_PROVEEDOR',
                    fatal: false,
                    errno: 504,
                };
                throw _error;
            }
            return result;
        });
    }
}
exports.default = ProveedorModel;
//# sourceMappingURL=proveedor.model.js.map