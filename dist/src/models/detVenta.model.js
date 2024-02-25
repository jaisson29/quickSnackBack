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
class DetVentaModel {
    static create(data) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO detVenta (prodId, transacId, detVenCant) VALUES ?';
            let insertItems = data.det.map((item) => {
                return [item.prodId, data.transacId, item.cantidad];
            });
            db_1.db.query(sql, [insertItems], (err, resultado) => {
                if ((resultado === null || resultado === void 0 ? void 0 : resultado.affectedRows) >= 1) {
                    resolve(resultado);
                }
                else {
                    const error = new Error(err.message);
                    reject(error);
                }
            });
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
				SELECT detVentaId, prodId, transacId 
				FROM detVenta
			`;
            const [results] = yield db_1.pool.query(sql);
            return results;
        });
    }
    static getAllXTrsId(data) {
        return new Promise((resolve, reject) => {
            const { transacId } = data;
            const sql = 'SELECT detventaId, prodId, transacId ' + 'FROM detventa' + 'WHERE transacId=?';
            db_1.db.query(sql, [transacId], (resultado, err) => {
                if (err) {
                    const error = new Error('No se encontraron registros');
                    reject(error);
                }
                else {
                    resolve(resultado);
                }
            });
        });
    }
}
exports.default = DetVentaModel;
//# sourceMappingURL=detVenta.model.js.map