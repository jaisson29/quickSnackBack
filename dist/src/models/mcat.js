"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
class Mcat {
    static getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM categoria';
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
                const query = 'INSERT INTO categoria ( catNom) VALUES (?)';
                db_1.db.query(query, [data.catNom], (err, result) => {
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
                const query = 'UPDATE categoria' + ' ' + 'SET catNom = ?' + ' ' + 'WHERE catId = ?';
                db_1.db.query(query, [data.catNom, data.catId], (err, result) => {
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
                const query = 'DELETE FROM categoria WHERE catId = ?';
                db_1.db.query(query, [data.catId], (err, result) => {
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
    static getMxP() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT catId, COUNT(catId) as can FROM producto group by catId';
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
}
exports.default = Mcat;
//# sourceMappingURL=mcat.js.map