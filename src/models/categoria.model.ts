import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { db, pool } from '../config/db';

class Mcat {
	static async getAll() {
		const sql = 'SELECT * FROM categoria';

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql);
		return results;
	}

	static async create(data: any) {
		const sql = 'INSERT INTO categoria ( catNom) VALUES (?)';

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [data.catNom]);
		return result;
	}

	static async update(data: any) {
		const sql = 'UPDATE categoria' + ' ' + 'SET catNom = ?' + ' ' + 'WHERE catId = ?';
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [
			data.catNom,
			data.catId,
		]);

		return result;
	}

	static async delete(data: any) {
		const sql = 'DELETE FROM categoria WHERE catId = ?';

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [data.catId]);
		return result;
	}

	static async getMxP() {
		const sql = 'SELECT catId, COUNT(catId) as can FROM producto group by catId';
		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql);
		return results;
	}
}

export default Mcat;
