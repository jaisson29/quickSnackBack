/** @format */

import { db } from '../config/db.js'

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
          console.log(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

	static create(data) {
		return new Promise((resolve, reject) => {
			try {
				const query =
					'INSERT INTO producto (catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen) VALUES (?, ?, ?, ?, ?, ?)'

				const { catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen } = data
				db.query(query, [catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen], (err, result) => {
					if (result && result.affectedRows === 1) {
						resolve(result)
					} else {
						reject(new Error(err))
					}
				})
			} catch (err) {
				reject(err)
			}
		})
	}

	static update(data) {
		return new Promise((resolve, reject) => {
			try {
				const query =
					'UPDATE producto' +
					' ' +
					'SET catId = ?, prodNom = ?, prodDescr = ?, prodImg = ?, prodValCom = ?, prodValVen = ?' +
					' ' +
					'WHERE prodId = ?'
				const { catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen, prodId } = data
				db.query(query, [catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen, prodId], (err, result) => {
					if (result.affectedRows == 1) {
						resolve(`Se actualizo ${result.affectedRows} registro`)
					} else {
						reject(new Error(err))
					}
				})
			} catch (error) {
				reject(error)
			}
		})
	}

	static delete(data) {
		return new Promise((resolve, reject) => {
			try {
				const query = 'DELETE FROM producto WHERE prodId = ?'
				const { prodId } = data

				db.query(query, [prodId], (err, result) => {
					if (result.affectedRows == 1) {
						resolve(`Se elimino ${result.affectedRows} registro`)
					} else {
						reject(new Error(err))
					}
				})
			} catch (error) {
				reject(new Error(error))
			}
		})
	}
}

export default ProductModel
