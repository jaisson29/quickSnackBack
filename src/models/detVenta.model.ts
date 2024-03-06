/** @format */

import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { db, pool } from '../config/db';
import { DetVenta } from '../types';

export default class DetVentaModel {
	static async create(data: any) {
		const sql = 'INSERT INTO detVenta (prodId, transacId, detVenCant) VALUES ?';
		const insertItems = data.det.map((item: any) => {
			return [item.prodId, data.transacId, item.cantidad];
		});
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [insertItems]);
		return result;
	}

	static async getAll() {
		const sql = `
				SELECT detVentaId, prodId, transacId 
				FROM detVenta
			`;

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query(sql);
		return results;
	}

	static async getAllXTrsId(data: any) {
		const { transacId } = data;
		const sql = `
			SELECT detventaId, prodId, transacId 
			FROM detventa 
			WHERE transacId = ?
		`;

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [transacId]);
		return results;
	}
}
