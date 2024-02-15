"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
class Compra {
    static getAll() {
        return new Promise((resolve, reject) => {
            try {
                const query = 'SELECT c.compraId, c.provId, c.fechaCompra, p.provNom FROM compra AS c INNER JOIN proveedor AS p ON c.provId=p.provId';
                db_1.db.query(query, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    static create(data) {
        return new Promise((resolve, reject) => {
            try {
                const query = 'INSERT INTO compra (provId, fechaCompra) VALUES (?, ?)';
                const { provId, fechaCompra } = data;
                db_1.db.query(query, [provId, fechaCompra], (err, result) => {
                    if (result && (result === null || result === void 0 ? void 0 : result.affectedRows) === 1) {
                        resolve(result);
                    }
                    else {
                        throw err;
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    static editar(data) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE compra SET provId = ?, fechaCompra = ? WHERE compraId = ?';
            const { provId, fechaCompra, compraId } = data;
            db_1.db.query(query, [provId, fechaCompra, compraId], (err, result) => {
                if (result.affectedRows === 1) {
                    resolve(`Se actualizó ${result.affectedRows} registro`);
                }
                else {
                    throw err;
                }
            });
        });
    }
    static eliminar(data) {
        return new Promise((resolve, reject) => {
            try {
                const query = 'DELETE FROM compra WHERE compraId = ?';
                const { compraId } = data;
                db_1.db.query(query, [compraId], (err, result) => {
                    if (result.affectedRows === 1) {
                        resolve(`Se eliminó ${result.affectedRows} registro`);
                    }
                    else {
                        throw err;
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.default = Compra;
//# sourceMappingURL=compra.model.js.map