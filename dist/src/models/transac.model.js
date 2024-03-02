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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
class TransacModel {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
			INSERT INTO transaccion(transacFecha, transacTipo, usuId, transacEst) 
			VALUES(?, ?, ?, ?)
		`;
            const { transacFecha, transacTipo, usuId } = data;
            const [result] = yield db_1.pool.query(sql, [transacFecha, transacTipo, usuId, 1]);
            if (result.affectedRows === 0) {
                const _error = {
                    name: 'MysqlError',
                    errno: 503,
                    code: 'DB_ERROR',
                    message: 'Ocurrió un error al crear el registro',
                    fatal: false,
                };
                throw _error;
            }
            return result;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, ts.transacEst, usu.usuNom ' +
                'FROM transaccion ts ' +
                'INNER JOIN usuario usu ' +
                'ON ts.usuId = usu.usuId';
            const [result] = yield db_1.pool.query(sql);
            return result;
        });
    }
    static getByUser(usuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
				SELECT ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, ts.transacEst, usu.usuNom, usu.usuNoDoc, prv.catId, SUM(dtv.detVenCant * prv.prodValVen) AS tot
				FROM transaccion AS ts
				INNER JOIN usuario AS usu
				ON ts.usuId = usu.usuId
				INNER JOIN detVenta AS dtv
				ON ts.transacId = dtv.transacId
				INNER JOIN producto AS prv
				ON dtv.prodId = prv.prodId
				WHERE ts.usuId = ?
				GROUP BY ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, usu.usuNom, prv.catId
				ORDER BY ts.transacFecha
			`;
            const [results] = yield db_1.pool.query(sql, [usuId]);
            return results;
        });
    }
    static delete(transacId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
			UPDATE transaccion 
			SET transacEst = 0
			WHERE transacId = ?
		`;
            const [result] = yield db_1.pool.query(sql, [transacId]);
            return result;
        });
    }
    static complete(transacId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
			UPDATE transaccion 
			SET transacEst = 2
			WHERE transacId = ?
		`;
            const [result] = yield db_1.pool.query(sql, [transacId]);
            return result;
        });
    }
}
exports.default = TransacModel;
//# sourceMappingURL=transac.model.js.map