/** @format */

import { Pagina, Perfil } from 'index';
import { db, pool } from '../config/db';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

class Mpef {
	static async getAll() {
		const sql = 'SELECT * FROM perfil';

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql);
		return results;
	}

	static async create(data: Perfil) {
		const sql = 'INSERT INTO perfil ( perfilNom ) VALUES (?)';

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [data.perfilNom]);
		return result;
	}

	static async update(data: any) {
		const sql = 'UPDATE perfil' + ' ' + 'SET perfilNom = ?' + ' ' + 'WHERE perfilId = ?';
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [
			data.perfilId,
			data.perfilNom,
		]);
		return result;
	}

	static async delete(data: any) {
		const sql = 'DELETE FROM perfil WHERE perfilId = ?';

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [data.perfilId]);
		return result;
	}

	static async createPxP(data: any) {
		const queryData = data.pxp.map((paginaId: any) => {
			return [parseInt(paginaId), parseInt(data.perfilId)];
		});
		console.log(queryData);
		const sql = 'INSERT INTO perxpag(paginaId,perfilId) VALUES ?';
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [queryData]);
		return result;
	}

	static async delPxP(perfilId: number | string) {
		const sql = 'DELETE FROM perxpag WHERE perfilId = ?';

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(sql, [perfilId]);
		return result;
	}

	static async selPxp() {
		const sql = 'SELECT paginaId, perfilId FROM perxpag';

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql);
		return result;
	}
	static async selPxpId(perfilId: number | string) {
		const sql = 'SELECT paginaId, perfilId FROM perxpag WHERE perfilId = ?';

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [perfilId]);
		return result;
	}
}

export default Mpef;
