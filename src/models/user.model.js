/** @format */

import { db } from '../config/db.js'

class UserModel {
	static getAll() {
		return new Promise((resolve, reject) => {
			try {
				const query =
					'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc , usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuKey ' +
					'FROM usuario AS usu ' +
					'INNER JOIN perfil AS per ' +
					'ON usu.perfilId = per.perfilId '
				db.query(query, (err, result) => {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				})
			} catch (err) {
				reject(err)
			}
		})
	}

	static getOneXId(data) {
		return new Promise((resolve, reject) => {
			try {
				const sql =
					'SELECT usu.usuId, usu.usuTipoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuKey ' +
					'FROM usuario AS usu ' +
					'INNER JOIN perfil AS per ' +
					'ON usu.perfilId = per.perfilId ' +
					'WHERE usu.usuId = ? '
				const { usuId } = data

				db.query(sql, [usuId], (err, result) => {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				})
			} catch (err) {
				reject(err)
			}
		})
	}

	static getOne(data) {
		return new Promise((resolve, reject) => {
			const keys = Object.keys(data)
			const values = Object.values(data)
			let conditions = keys.map((key) => `${key} = ?`).join(' AND ')
			const sql = `SELECT usuId, usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuKey FROM usuario WHERE ${conditions}`
			
			db.query(sql, values, (err, result) => {
				if (err) {
					const error = new Error()
					error.name = 'Fallo en obtener los datos'
					error.codigo = 1001
					error.error = err
					reject(error)
				} else if(result.length === 0){
					const error = new Error()
					error.name = 'Fallo en obtener los datos'
					error.codigo = 1004
					reject(error)
				} else {
					resolve(result[0])
				}
			})
		})
	}

	static getOneXEmailXContra(data) {
		return new Promise((resolve, reject) => {
			try {
				const sql =
					'SELECT usu.usuId, usu.usuTipoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, per.perfilId, per.paginaRuta, usu.usuKey ' +
					'FROM usuario AS usu ' +
					'INNER JOIN perfil AS per ' +
					'ON usu.perfilId = per.perfilId ' +
					'WHERE usuEmail = ?'
				const { usuEmail } = data
				db.query(sql, [usuEmail], (err, result) => {
					if (err) {
						reject(new Error(err))
					} else {
						resolve(result)
					}
				})
			} catch (err) {
				reject(err)
			}
		})
	}

	static create(data) {
		return new Promise((resolve, reject) => {
			try {
				const query =
					'INSERT INTO usuario(usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId) ' +
					'VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
				const { usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId } = data
				db.query(query, [usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId], (err, result) => {
					if (result && result.affectedRows === 1) {
						resolve(result)
					} else {
						reject(new Error(err))
					}
				})
			} catch (err) {
				reject(new Error(err))
			}
		})
	}

	static update(data) {
		return new Promise((resolve, reject) => {
			try {
				const query =
					'UPDATE usuario ' +
					'SET usuTipoDoc = ?, usuNoDoc = ?, usuGen = ?, usuNom = ?, usuEmail = ?, usuContra = ?, usuIngreso = ?, perfilId = ? ' +
					'WHERE usuId = ?'
				const { usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId, usuId } = data
				db.query(
					query,
					[usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId, usuId],
					(err, result) => {
						if (result && result.affectedRows === 1) {
							resolve(result)
						} else {
							reject(err)
						}
					},
				)
			} catch (err) {
				reject(err)
			}
		})
	}

	static delete(data) {
		return new Promise((resolve, reject) => {
			try {
				const sql = 'DELETE FROM usuario WHERE usuId = ?'
				const { usuId } = data

				db.query(sql, [usuId], (err, result) => {
					if (result && result.affectedRows === 1) {
						resolve(result)
					} else {
						reject(err)
					}
				})
			} catch (err) {
				reject(err)
			}
		})
	}
}

export default UserModel
