"use strict";
/** @format */
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
        return new Promise((resolve, reject) => {
            const sql = 'SELECT detVentaId, prodId, transacId ' + 'FROM detventa';
            db_1.db.query(sql, (err, resultado) => {
                if (err) {
                    reject(new Error('Error al acceder a los datos'));
                }
                else if (resultado.length === 0) {
                    reject(new Error('No se encontraron registros'));
                }
                else {
                    resolve(resultado);
                }
            });
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