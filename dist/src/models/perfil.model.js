"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
class Mpef {
    static getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM perfil';
            db_1.db.query(query, (err, results) => {
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
                const query = 'INSERT INTO perfil ( perfilNom ) VALUES (?)';
                db_1.db.query(query, [data.perfilNom], (err, result) => {
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
                const query = 'UPDATE perfil' + ' ' + 'SET perfilNom = ?' + ' ' + 'WHERE perfilId = ?';
                db_1.db.query(query, [data.perfilId, data.perfilNom], (err, result) => {
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
                const query = 'DELETE FROM perfil WHERE perfilId = ?';
                db_1.db.query(query, [data.perfilId], (err, result) => {
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