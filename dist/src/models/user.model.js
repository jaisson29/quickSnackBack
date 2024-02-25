"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    static getAll() {
        return new Promise((resolve, reject) => {
            try {
                const sql = 'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc , usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuKey ' +
                    'FROM usuario AS usu ' +
                    'INNER JOIN perfil AS per ' +
                    'ON usu.perfilId = per.perfilId ';
                db_1.db.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    static getOneXId(data) {
        return new Promise((resolve, reject) => {
            try {
                const sql = 'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuKey ' +
                    'FROM usuario AS usu ' +
                    'INNER JOIN perfil AS per ' +
                    'ON usu.perfilId = per.perfilId ' +
                    'WHERE usu.usuId = ? ';
                const { usuId } = data;
                db_1.db.query(sql, [usuId], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    static getOne(data) {
        return new Promise((resolve, reject) => {
            if (typeof data !== 'object' || data === null || Array.isArray(data)) {
                reject(new Error('Los datos proporcionados no son válidos'));
                return;
            }
            const filterData = Object.assign({}, data);
            const keys = Object.keys(filterData).filter((key) => this.keysPermitidas.includes(key));
            if (keys.length === 0) {
                reject(new Error('No se encontraron datos'));
                return;
            }
            const values = keys.map((key) => filterData[key]);
            let conditions = keys.map((key) => `${key} = ?`).join(' AND ');
            const sql = `SELECT usuId, usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuKey, usuOlvid, usuEst FROM usuario WHERE ${conditions}`;
            db_1.db.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                else if (result.length === 0) {
                    const error = new Error('Fallo en obtener los datos');
                    reject(error);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    }
    static getOneXEmailXContra(data) {
        return new Promise((resolve, reject) => {
            try {
                const sql = 'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, per.perfilId, per.paginaRuta, usu.usuKey ' +
                    'FROM usuario AS usu ' +
                    'INNER JOIN perfil AS per ' +
                    'ON usu.perfilId = per.perfilId ' +
                    'WHERE usuEmail = ?';
                const { usuEmail } = data;
                db_1.db.query(sql, [usuEmail], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    static create(data) {
        const sql = `INSERT INTO usuario(usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const { usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId } = data;
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO usuario(usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const { usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId } = data;
            bcrypt_1.default
                .hash(usuContra, 10)
                .then((hash) => {
                db_1.db.query(sql, [usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, hash, usuIngreso, perfilId], (err, result) => {
                    if (result && result.affectedRows === 1) {
                        resolve(result);
                    }
                    else {
                        reject(err);
                    }
                });
            })
                .catch((err) => {
                throw new Error(err);
            });
        });
    }
    static update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!data.usuId) {
                    reject(new Error('No se proporcionaron los datos necesarios'));
                    return;
                }
                const updateData = Object.assign({}, data);
                const { usuId } = updateData, fieldsToUpdate = __rest(updateData, ["usuId"]);
                const keys = Object.keys(fieldsToUpdate).filter((key) => this.keysPermitidas.includes(key));
                if (keys.length === 0) {
                    reject(new Error('No se enviaron parámetros para actualizar'));
                    return;
                }
                const values = keys.map((key) => fieldsToUpdate[key]);
                const seteos = keys.map((key) => `${key} = ?`).join(', ');
                const sql = `UPDATE usuario SET ${seteos} WHERE usuId = ?`;
                db_1.db.query(sql, [...values, usuId], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else if (result && result.affectedRows === 1) {
                        resolve(result);
                    }
                    else {
                        reject(new Error('No se pudo actualizar el usuario'));
                    }
                });
            });
        });
    }
    static delete(data) {
        return new Promise((resolve, reject) => {
            try {
                const sql = 'DELETE FROM usuario WHERE usuId = ?';
                const { usuId } = data;
                db_1.db.query(sql, [usuId], (err, result) => {
                    if (result && result.affectedRows === 1) {
                        resolve(result);
                    }
                    else {
                        reject(err);
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
UserModel.keysPermitidas = [
    'usuId',
    'usuTipoDoc',
    'usuNoDoc',
    'usuGen',
    'usuNom',
    'usuEmail',
    'usuContra',
    'usuIngreso',
    'usuImg',
    'perfilI',
    'usuKey',
    'usuOlvid',
];
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map