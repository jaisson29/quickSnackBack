/** @format */

import { db, query } from '../config/db.js'

class TransacModel {
	static getAll() {
		return new Promise((resolve, reject) => {
			const sql =
				'SELECT ts.transacId, ts.transacFecha, ts.transacTipo, ts.transacCant, usu.usuId, usu.usuNom ' +
				'FROM transaccion ts ' +
				'INNER JOIN usuario usu ' +
				'ON ts.usuId = usu.usuId'

			db.query(sql, function (err, res) {
				if (err) {
					const error = new Error(err)
					error.name = 'Fallo en la consulta'
					error.cod = 1010
					reject(error)
				} else if (res.length === 0) {
					const error = new Error('No se encontraron transacciones realizadas')
					error.name = 'Sin registros'
					error.cod = 1001
					reject(error)
				} else {
					resolve(res)
				}
			})
		})
	}

	static getByUser(data) {
		return new Promise((resolve, reject) => {
			const sql =
				'SELECT ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, usu.usuNom, usu.usuNoDoc, prv.catId, SUM(dtv.detVenCant * prv.prodValVen) AS tot ' +
				'FROM transaccion ts ' +
				'INNER JOIN usuario usu ' +
				'ON ts.usuId = usu.usuId ' +
				'INNER JOIN detVenta dtv ' +
				'ON ts.transacId = dtv.transacId ' +
				'INNER JOIN producto prv ' +
				'ON dtv.prodId = prv.prodId ' +
				'WHERE ts.usuId = ?' +
				'GROUP BY ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, usu.usuNom, prv.catId'

			const { usuId } = data

			db.query(sql, [usuId], (err, res) => {
				if (err) {
					const error = new Error(err)
					error.name = 'Fallo en la consulta'
					error.codigo = 500
					reject(error)
				} else {
					const error = new Error()
					error.codigo = 204
					res.length !== 0 ? resolve(res) : reject(error)
				}
			})
		})
	}

	static create(data) {
		return new Promise((resolve, reject) => {
			const sql = 'INSERT INTO transaccion(transacFecha, transacCant, usuId) ' + 'VALUES(?, ?, ?)'
			const { transacFecha, transacCant, usuId } = data

			query(sql, [transacFecha, transacCant, usuId])
				.then((resultado) => {
					resolve(resultado)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
}

export default TransacModel
