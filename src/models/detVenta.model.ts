/** @format */

import { db } from '../config/db';

interface DetVenta {
	prodId: number;
	transacId: number;
	detVenCant: number;
}
export default class DetVentaModel {
	static create(data: any) {
		return new Promise((resolve, reject) => {
			const sql = 'INSERT INTO detventa (prodId, transacId, detVenCant) VALUES ?';
			let insertItems = data.det.map((item: DetVenta) => {
				return [item.prodId, data.transacId, item.detVenCant];
			});
			db.query(sql, [insertItems], (err, resultado: any) => {
				if (resultado?.affectedRows >= 1) {
					resolve(resultado);
				} else {
					const error = new Error('No se pudo agregar el detalle');
					reject(error);
				}
			});
		});
	}

	static getAll() {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT detVentaId, prodId, transacId ' + 'FROM detventa';

			db.query(sql, (err, resultado: any) => {
				if (err) {
					reject(new Error('Error al acceder a los datos'));
				} else if (resultado.length === 0) {
					reject(new Error('No se encontraron registros'));
				} else {
					resolve(resultado);
				}
			});
		});
	}

	static getAllXTrsId(data: any) {
		return new Promise((resolve, reject) => {
			const { transacId } = data;
			const sql = 'SELECT detventaId, prodId, transacId ' + 'FROM detventa' + 'WHERE transacId=?';

			db.query(sql, [transacId], (resultado, err) => {
				if (err) {
					const error = new Error('No se encontraron registros');
					reject(error);
				} else {
					resolve(resultado);
				}
			});
		});
	}
}

