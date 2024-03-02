"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
class ProductModel {
    static getAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT p.prodId, c.catNom, c.catId, p.prodNom, p.prodDescr, p.prodImg, p.prodValCom, p.prodValVen ' +
                'FROM producto p ' +
                'INNER JOIN categoria c ' +
                'ON p.catId = c.catId ' +
                'WHERE c.catId != 1';
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
    static getAllXCat(data) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT p.prodId, c.catNom, c.catId, p.prodNom, p.prodDescr, p.prodImg, p.prodValCom, p.prodValVen ' +
                'FROM producto p ' +
                'INNER JOIN categoria c ' +
                'ON p.catId = c.catId ' +
                'WHERE p.catId = ?';
            db_1.db.query(sql, [data.catId], (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    static getVenXProd() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT prodId, COUNT(prodId) cant ' + 'FROM `detventa` ' + 'GROUP BY prodId;';
            db_1.db.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    static create(data) {
        return new Promise((resolve, reject) => {
            try {
                const sql = 'INSERT INTO producto (catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen) VALUES (?, ?, ?, ?, ?, ?)';
                const { catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen } = data;
                db_1.db.query(sql, [catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen], (err, result) => {
                    if (result && result.affectedRows === 1) {
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
                const sql = 'UPDATE producto' +
                    ' ' +
                    'SET catId = ?, prodNom = ?, prodDescr = ?, prodImg = ?, prodValCom = ?, prodValVen = ?' +
                    ' ' +
                    'WHERE prodId = ?';
                const { catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen, prodId } = data;
                db_1.db.query(sql, [catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen, prodId], (err, result) => {
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
                const sql = 'DELETE FROM producto WHERE prodId = ?';
                const { prodId } = data;
                db_1.db.query(sql, [prodId], (err, result) => {
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
exports.default = ProductModel;
//# sourceMappingURL=product.model.js.map