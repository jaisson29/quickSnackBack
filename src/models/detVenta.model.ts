/** @format */

import { db } from '../config/db.ts'

export default class DetVentaModel {
	static create(data) {
		return new Promise((resolve, reject) => {
			const sql = 'INSERT INTO detventa (prodId, transacId, detVenCant) VALUES ?'
			let insertItems = data.det.map((item) => {
				return [item.prodId, data.transacId, item.cantidad]
			})
			db.query(sql, [insertItems], (err, resultado) => {
				if (resultado?.affectedRows >= 1) {
					resolve(resultado)
				} else {
					const error = new Error('No se pudo agregar el detalle')
					error.name = 'Fallo en crear el registro'
					error.cod = 1500
					error.status = 501
					error.error = err
					reject(error)
				}
			})
		})
	}

	static getAll() {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT detVentaId, prodId, transacId ' + 'FROM detventa'

			db.query(sql, (err, resultado) => {
				if (err) {
					const error = new Error('Error al acceder a los datos')
					error.name = 'Fallo del servidor'
					error.cod = 1002
					error.message = err
					reject(error)
				} else if (resultado.length === 0) {
					const error = new Error('No se encontraron registros')
					error.name = 'Sin registros'
					error.cod = 1001
					error.message = err
					reject(error)
				} else {
					resolve(resultado)
				}
			})
		})
	}

	static getAllXTrsId(data) {
		return new Promise((resolve, reject) => {
			const { transacId } = data
			const sql = 'SELECT detventaId, prodId, transacId ' + 'FROM detventa' + 'WHERE transacId=?'

			db.query(sql, [transacId], (resultado, err) => {
				if (err) {
					const error = new Error('No se encontraron registros')
					error.name = 'Sin registros'
					error.cod = 1001
					error.message = err
					reject(error)
				} else {
					resolve(resultado)
				}
			})
		})
	}
}
