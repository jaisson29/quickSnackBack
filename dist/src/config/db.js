"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const port = Number(process.env.DB_PORT);
const dbConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: port,
};
const db = mysql2_1.default.createConnection(dbConfig);
exports.db = db;
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida');
});
//This is only if we going to use a pool of connection if not the following code it's no used
const poolConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
};
const pool = mysql2_1.default.createPool(poolConfig);
// Ejecuta el pool y utiliza una conexion para ejecutar una query
function useQuery(sql, values) {
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
exports.useQuery = useQuery;
//# sourceMappingURL=db.js.map