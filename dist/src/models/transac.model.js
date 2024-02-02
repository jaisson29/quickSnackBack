"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
class TransacModel {
    static create(data) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO transaccion(transacFecha, transacTipo, usuId) ' + 'VALUES(?, ?, ?)';
            const { transacFecha, transacTipo, usuId } = data;
            (0, db_1.useQuery)(sql, [transacFecha, transacTipo, usuId])
                .then((resultado) => {
                resolve(resultado);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, usu.usuNom ' +
                'FROM transaccion ts ' +
                'INNER JOIN usuario usu ' +
                'ON ts.usuId = usu.usuId';
            db_1.db.query(sql, function (err, res) {
                if (err) {
                    reject(err);
                }
                else if (res.length === 0) {
                    const error = new Error('No se encontraron transacciones realizadas');
                    reject(error);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    static getByUser(data) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, usu.usuNom, usu.usuNoDoc, prv.catId, SUM(dtv.detVenCant * prv.prodValVen) AS tot ' +
                'FROM transaccion ts ' +
                'INNER JOIN usuario usu ' +
                'ON ts.usuId = usu.usuId ' +
                'INNER JOIN detVenta dtv ' +
                'ON ts.transacId = dtv.transacId ' +
                'INNER JOIN producto prv ' +
                'ON dtv.prodId = prv.prodId ' +
                'WHERE ts.usuId = ?' +
                'GROUP BY ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, usu.usuNom, prv.catId ' +
                'ORDER BY ts.transacFecha';
            const { usuId } = data;
            db_1.db.query(sql, [usuId], (err, res) => {
                if (err) {
                    const error = err;
                    error.name = 'Fallo en la consulta';
                    reject(error);
                }
                else {
                    const error = new Error("No se encontraron datos");
                    res.length !== 0 ? resolve(res) : reject(error);
                }
            });
        });
    }
}
exports.default = TransacModel;
//# sourceMappingURL=transac.model.js.map