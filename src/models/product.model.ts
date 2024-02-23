import { ResultSetHeader, FieldPacket, RowDataPacket } from 'mysql2/promise';
import { pool } from '../config/db';

class ProductModel {
	static async getAll() {
		const sql = `
				SELECT p.prodId, c.catNom, c.catId, p.prodNom, p.prodDescr, p.prodImg, 
					p.prodValCom, p.prodValVen, p.prodEst
				FROM producto p
				INNER JOIN categoria AS c
				ON p.catId = c.catId
				WHERE c.catId != 1
			`;

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql);
		return results;
	}

	static async getAllXCat(data: any) {
		const sql = `
			SELECT p.prodId, c.catNom, c.catId, p.prodNom, p.prodDescr, p.prodImg, p.prodValCom, p.prodValVen, p.prodEst
			FROM producto AS p
			INNER JOIN categoria AS c
			ON p.catId = c.catId
			WHERE p.catId = ?
		`;
		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [data.catId]);
		return results;
	}

	static async getVenXProd() {
		const sql = `
			SELECT prodId, COUNT(prodId) cant 
			FROM detventa 
			GROUP BY prodId
		`;
		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql);
		return results;
	}

	static async create(data: any) {
		const sql =
			'INSERT INTO producto (catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen, prodEst) VALUES (?, ?, ?, ?, ?, ?, ?)';

		const { catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen } = data;
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [
			catId,
			prodNom,
			prodDescr,
			prodImg,
			prodValCom,
			prodValVen,
			1,
		]);
		return result;
	}

	static async update(data: any) {
		const sql = `
			UPDATE producto
			SET catId = ?, prodNom = ?, prodDescr = ?, prodImg = ?, prodValCom = ?, prodValVen = ?
			WHERE prodId = ?
		`;
		const { catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen, prodId } = data;
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(sql, [
			catId,
			prodNom,
			prodDescr,
			prodImg,
			prodValCom,
			prodValVen,
			prodId,
		]);
		return result;
	}

	static async delete(data: any) {
		const sql = `
			UPDATE producto 
			SET prodEst = ? 
			WHERE prodId = ?
		`;
		const { prodId } = data;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [0, prodId]);
		return result;
	}
}

export default ProductModel;
