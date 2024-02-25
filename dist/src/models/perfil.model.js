"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
class Mpef {
    static getAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM perfil';
            db_1.db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    static create(data) {
        return new Promise((resolve, reject) => {
            try {
                const sql = 'INSERT INTO perfil ( perfilNom ) VALUES (?)';
                db_1.db.query(sql, [data.perfilNom], (err, result) => {
                    if (result.affectedRows === 1) {
                        resolve(result);
                    }
                    else {
                        reject(err);
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    static update(data) {
        return new Promise((resolve, reject) => {
            try {
                const sql = 'UPDATE perfil' + ' ' + 'SET perfilNom = ?' + ' ' + 'WHERE perfilId = ?';
                db_1.db.query(sql, [data.perfilId, data.perfilNom], (err, result) => {
                    if (result.affectedRows == 1) {
                        resolve(`Se actualizo ${result.affectedRows} registro`);
                    }
                    else {
                        reject(err);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static delete(data) {
        return new Promise((resolve, reject) => {
            try {
                const sql = 'DELETE FROM perfil WHERE perfilId = ?';
                db_1.db.query(sql, [data.perfilId], (err, result) => {
                    if (result.affectedRows == 1) {
                        resolve(`Se elimino ${result.affectedRows} registro`);
                    }
                    else {
                        reject(err);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = Mpef;
//# sourceMappingURL=perfil.model.js.map