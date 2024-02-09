import mysql, { ConnectionOptions } from 'mysql2';
import mysql2, { PoolOptions } from 'mysql2/promise';

const port = Number(process.env.DB_PORT);
const dbConfig: ConnectionOptions = {
	host: process.env.DB_HOST,
	database: process.env.DB,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	port: port,
};

const db = mysql.createConnection(dbConfig);

const connectionDb = () => {
	db.connect((_error) => {
		if (_error) console.error('Error al conectar a la base de datos:', _error);
		console.log('Conexión a la base de datos MySQL establecida');
		return db;
	});
};

connectionDb();

//This is only if we going to use a pool of connection if not the following code it's no used
const poolConfig: PoolOptions = {
	host: process.env.DB_HOST,
	database: process.env.DB,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	connectionLimit: 20,
};
const pool = mysql2.createPool(poolConfig);

export { db, pool };

