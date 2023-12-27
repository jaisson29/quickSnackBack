/** @format */

import { db } from '../config/db.ts'

class Mpef {
	static getAll() {
		return new Promise((resolve, reject) => {
			const query = 'SELECT * FROM perfil'

			db.query(query, (err, results) => {
				if (err) {
					reject(err)
				} else {
					resolve(results)
				}
			})
		})
	}

	static create(data) {
		return new Promise((resolve, reject) => {
			try {
				const query = 'INSERT INTO perfil ( perfilNom ) VALUES (?)'

				db.query(query, [data.perfilNom], (err, result) => {
					if (result.affectedRows === 1) {
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
				const query = 'UPDATE perfil' + ' ' + 'SET perfilNom = ?' + ' ' + 'WHERE perfilId = ?'
				db.query(query, [data.perfilId, data.perfilNom], (err, result) => {
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
				const query = 'DELETE FROM perfil WHERE perfilId = ?'

				db.query(query, [data.perfilId], (err, result) => {
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

export default Mpef
