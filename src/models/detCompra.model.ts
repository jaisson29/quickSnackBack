/** @format */

import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

export default class DetCompraModel {
	static async create(data: any) {
		const sql = 'INSERT INTO detCompra (prodId, compraId, detComCant) VALUES ?';
		const insertItems = data.det.map((item: any) => {
			return [item.prodId, data.compraId, item?.cantidad ?? item.detComCant];
		});
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [insertItems]);
		return result;
	}

	static async getAll() {
		const sql = `
				SELECT detVentaId, prodId, compraId 
				FROM detCompra
			`;

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query(sql);
		return results;
	}

	static async getAllXCompraId(data: any) {
		const { compraId } = data;
		const sql = `
			SELECT detventaId, prodId, compraId 
			FROM detventa 
			WHERE compraId = ?
		`;

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [compraId]);
		return results;
	}
}
