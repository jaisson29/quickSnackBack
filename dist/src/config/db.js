"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const promise_1 = __importDefault(require("mysql2/promise"));
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
const connectionDb = () => {
    db.connect((_error) => {
        if (_error)
            console.error('Error al conectar a la base de datos:', _error);
        console.log('Conexión a la base de datos MySQL establecida');
        return db;
    });
};
connectionDb();
//This is only if we going to use a pool of connection if not the following code it's no used
const poolConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 20,
};
const pool = promise_1.default.createPool(poolConfig);
exports.pool = pool;
//# sourceMappingURL=db.js.map