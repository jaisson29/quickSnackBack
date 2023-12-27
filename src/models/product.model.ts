/** @format */

import { db } from '../config/db';

class ProductModel {
	static getAll() {
		return new Promise((resolve, reject) => {
			const query =
				'SELECT p.prodId, c.catNom, c.catId, p.prodNom, p.prodDescr, p.prodImg, p.prodValCom, p.prodValVen ' +
				'FROM producto p ' +
				'INNER JOIN categoria c ' +
				'ON p.catId = c.catId ' +
				'WHERE c.catId != 1';

			db.query(query, (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
	}

	static getAllXCat(data: any) {
		return new Promise((resolve, reject) => {
			const query =
				'SELECT p.prodId, c.catNom, c.catId, p.prodNom, p.prodDescr, p.prodImg, p.prodValCom, p.prodValVen ' +
				'FROM producto p ' +
				'INNER JOIN categoria c ' +
				'ON p.catId = c.catId ' +
				'WHERE p.catId = ?';
			db.query(query, [data.catId], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
	}

	static getVenXProd() {
		return new Promise((resolve, reject) => {
			const query = 'SELECT prodId, COUNT(prodId) cant ' + 'FROM `detventa` ' + 'GROUP BY prodId;';
			db.query(query, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}

	static create(data: any) {
		return new Promise((resolve, reject) => {
			try {
				const query = 'INSERT INTO producto (catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen) VALUES (?, ?, ?, ?, ?, ?)';

				const { catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen } = data;
				db.query(query, [catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen], (err, result: any) => {
					if (result && result.affectedRows === 1) {
						resolve(result);
					} else {
						reject(err);
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	static update(data: any) {
		return new Promise((resolve, reject) => {
			try {
				const query =
					'UPDATE producto' +
					' ' +
					'SET catId = ?, prodNom = ?, prodDescr = ?, prodImg = ?, prodValCom = ?, prodValVen = ?' +
					' ' +
					'WHERE prodId = ?';
				const { catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen, prodId } = data;
				db.query(query, [catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen, prodId], (err, result: any) => {
					if (result.affectedRows == 1) {
						resolve(`Se actualizo ${result.affectedRows} registro`);
					} else {
						reject(err);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	static delete(data: any) {
		return new Promise((resolve, reject) => {
			try {
				const query = 'DELETE FROM producto WHERE prodId = ?';
				const { prodId } = data;

				db.query(query, [prodId], (err, result: any) => {
					if (result.affectedRows == 1) {
						resolve(`Se elimino ${result.affectedRows} registro`);
					} else {
						reject(err);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default ProductModel;

