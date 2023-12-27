/** @format */

import mysql from 'mysql2';

const dbConfig = {
	host: process.env.DB_HOST,
	database: process.env.DB,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
};

const db = mysql.createConnection(dbConfig);
db.connect((err) => {
	if (err) {
		console.error('Error al conectar a la base de datos:', err);
		return;
	}
	console.log('Conexión a la base de datos MySQL establecida');
});
const pool = mysql.createPool(dbConfig);

// Ejecuta el pool y utiliza una conexion para ejecutar una query
function query(sql, values) {
	return new Promise((resolve, reject) => {
		//Obteniendo la conexion para usar
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
				return;
			}
			connection.query(sql, values, (queryErr, results) => {
				connection.release(); // Liberar la conexión
				if (queryErr) {
					reject(queryErr);
					return;
				}
				resolve(results);
			});
		});
	});
}

export { db, query };
