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
class CompraModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT c.compraId, c.provId, c.fechaCompra, p.provNom FROM compra AS c INNER JOIN proveedor AS p ON c.provId=p.provId';
            const [result] = yield db_1.pool.query(sql);
            return result;
        });
    }
    ;
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO compra (provId, fechaCompra) VALUES (?, ?)';
            const { provId, fechaCompra } = data;
            const [result] = yield db_1.pool.query(sql, [provId, fechaCompra]);
            if (result.affectedRows === 1) {
                const _error = {
                    name: 'MysqlError',
                    code: 'ER_NOT_CREATED_ERROR',
                    message: 'Ocurrió un error al crear el registro',
                    fatal: false,
                    errno: 501,
                };
                throw _error;
            }
            return result;
        });
    }
    static getOne(compraId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
			SELECT compraId, provId, fechaCompra FROM compra WHERE compraId=?;
			`;
            const [result] = yield db_1.pool.query(sql, [compraId]);
            if (!(result === null || result === void 0 ? void 0 : result.length)) {
                const _error = {
                    message: 'No se encontró el valor',
                    name: 'NotFoundError',
                    code: 'NOTFOUND_VALOR',
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
            const { compraId } = updateData, fieldsToUpdate = __rest(updateData, ["compraId"]);
            if (!compraId) {
                const noDataError = {
                    message: 'No se pudo actualizar la compra',
                    code: 'NotIdSentError',
                    name: 'NOT_DATA_SEND',
                    fatal: false,
                    errno: 503,
                };
                throw noDataError;
            }
            const seteos = Object.keys(fieldsToUpdate)
                .map((field) => `${field}= ?`)
                .join(', ');
            const values = Object.values(fieldsToUpdate);
            const sql = `UPDATE compra SET ${seteos} WHERE compraId=?`;
            const [result] = yield db_1.pool.query(sql, [...values, compraId]);
            if (result.affectedRows === 0) {
                const _error = {
                    message: 'No se pudo actualizar la compra',
                    name: 'NotUpdateError',
                    code: 'NOTUPDATE_COMPRA',
                    fatal: false,
                    errno: 503,
                };
                throw _error;
            }
            return result;
        });
    }
    static delete(compraId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM compra WHERE compraId = ?';
            const [result] = yield db_1.pool.query(sql, [compraId]);
            if (result.affectedRows === 0) {
                const _error = {
                    message: 'No se puede eliminar la compra',
                    name: 'NotDeleteError',
                    code: 'NOT_DELETE_COMPRA',
                    fatal: false,
                    errno: 504,
                };
                throw _error;
            }
            return result;
        });
    }
    ;
}
//# sourceMappingURL=compra.model.js.map