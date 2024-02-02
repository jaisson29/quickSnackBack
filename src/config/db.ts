/** @format */

import mysql, { ConnectionOptions, PoolOptions } from 'mysql2';

const port = Number(process.env.DB_PORT);
const dbConfig: ConnectionOptions = {
	host: process.env.DB_HOST,
	database: process.env.DB,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	port: port,
};

const db = mysql.createConnection(dbConfig);
db.connect((err) => {
	if (err) {
		console.error('Error al conectar a la base de datos:', err);
		return;
	}
	console.log('Conexión a la base de datos MySQL establecida');
});

//This is only if we going to use a pool of connection if not the following code it's no used
const poolConfig: PoolOptions = {
	host: process.env.DB_HOST,
	database: process.env.DB,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
};
const pool = mysql.createPool(poolConfig);

// Ejecuta el pool y utiliza una conexion para ejecutar una query
function useQuery(sql: string, values: any) {
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

export { db, useQuery };

