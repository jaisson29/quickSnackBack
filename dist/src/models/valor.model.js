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
class ValorModel {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
		INSERT INTO valor (param, domId) 
		VALUES (?, ?);
		`;
            const { param, domId } = data;
            const [result] = yield db_1.pool.query(sql, [param, domId]);
            if (result.affectedRows !== 1) {
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
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
		SELECT valorId, param, domId FROM valor;
		`;
            const results = yield db_1.pool.query(sql);
            if (!(results === null || results === void 0 ? void 0 : results.length)) {
                const _error = {
                    message: 'No se encontró el valor',
                    name: 'NotFoundError',
                    code: 'NOTFOUND_VALOR',
                    fatal: false,
                    errno: 502,
                };
                throw _error;
            }
            return results[0];
        });
    }
    static getOne(valorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
			SELECT valorId, param, domId FROM valor WHERE valorId=?;
			`;
            const [result] = yield db_1.pool.query(sql, [valorId]);
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
            const { valorId } = updateData, fieldsToUpdate = __rest(updateData, ["valorId"]);
            if (!valorId) {
                const noDataError = {
                    message: 'No se pudo actualizar al valor',
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
			UPDATE valor SET ${seteos} WHERE valorId=?;
		`;
            const [result] = yield db_1.pool.query(sql, [...values, valorId]);
            if (result.affectedRows === 0) {
                const _error = {
                    message: 'No se pudo actualizar al valor',
                    name: 'NotUpdateError',
                    code: 'NOTUPDATE_VALOR',
                    fatal: false,
                    errno: 503,
                };
                throw _error;
            }
            return result;
        });
    }
    static delete(valorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
			DELETE FROM valor WHERE valorId = ?
		`;
            const [result] = yield db_1.pool.query(sql, [valorId]);
            if (result.affectedRows === 0) {
                const _error = {
                    message: 'No se puede eliminar el valor',
                    name: 'NotDeleteError',
                    code: 'NOT_DELETE_VALOR',
                    fatal: false,
                    errno: 504,
                };
                throw _error;
            }
            return result;
        });
    }
}
exports.default = ValorModel;
//# sourceMappingURL=valor.model.js.map