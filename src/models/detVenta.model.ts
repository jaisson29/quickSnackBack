/** @format */

import { FieldPacket, RowDataPacket } from 'mysql2';
import { db, pool } from '../config/db';

interface DetVenta {
	prodId: number;
	transacId: number;
	cantidad: number;
}
export default class DetVentaModel {
	static create(data: any) {
		return new Promise((resolve, reject) => {
			const sql = 'INSERT INTO detVenta (prodId, transacId, detVenCant) VALUES ?';
			let insertItems = data.det.map((item: DetVenta) => {
				return [item.prodId, data.transacId, item.cantidad];
			});
			console.log(insertItems);
			db.query(sql, [insertItems], (err: any, resultado: any) => {
				if (resultado?.affectedRows >= 1) {
					resolve(resultado);
				} else {
					const error = new Error(err.message);
					reject(error);
				}
			});
		});
	}

	static async getAll() {
		const sql = `
				SELECT detVentaId, prodId, transacId 
				FROM detVenta
			`;

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query(sql);
		return results;
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

