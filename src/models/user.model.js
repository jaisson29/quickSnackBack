import { db } from '../config/db.js';

class UserModel {
  static getAll() {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuFecha, usu.usuPassCode ' +
          'FROM usuario AS usu ' +
          'INNER JOIN perfil AS per ' +
          'ON usu.perfilId = per.perfilId ';
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  static getOneXId(data) {
    return new Promise((resolve, reject) => {
      try {
        const sql =
          'SELECT usu.usuId, usu.usuTipoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuFecha, usu.usuPassCode ' +
          'FROM usuario AS usu ' +
          'INNER JOIN perfil AS per ' +
          'ON usu.perfilId = per.perfilId ' +
          'WHERE usu.usuId = ? ';
        const { usuId } = data;

        db.query(sql, [usuId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  static getOneXEmailXContra(data) {
    return new Promise((resolve, reject) => {
      try {
        const sql =
          'SELECT usu.usuId, usu.usuTipoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, per.perfilId, usu.usuFecha, usu.usuPassCode ' +
          'FROM usuario AS usu ' +
          'INNER JOIN perfil AS per ' +
          'ON usu.perfilId = per.perfilId ' +
          'WHERE usuEmail = ? AND usuContra = ?';
        const { usuEmail, usuContra } = data;
        db.query(sql, [usuEmail, usuContra], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'INSERT INTO usuario(usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId) ' +
          'VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const {
          usuTipoDoc,
          usuNoDoc,
          usuGen,
          usuNom,
          usuEmail,
          usuContra,
          usuIngreso,
          perfilId,
        } = data;
        db.query(
          query,
          [
            usuTipoDoc,
            usuNoDoc,
            usuGen,
            usuNom,
            usuEmail,
            usuContra,
            usuIngreso,
            perfilId,
          ],
          (err, result) => {
            if (result && result.affectedRows === 1) {
              resolve(result);
            } else {
              reject(err);
            }
          }
        );
      } catch (err) {
        console.log('error', err);
        reject(err);
      }
    });
  }

  static update(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'UPDATE usuario ' +
          'SET usuTipoDoc = ?, usuNoDoc = ?, usuGen = ?, usuNom = ?, usuEmail = ?, usuContra = ?, usuIngreso = ?, perfilId = ? ' +
          'WHERE usuId = ?';
        const {
          usuTipoDoc,
          usuNoDoc,
          usuGen,
          usuNom,
          usuEmail,
          usuContra,
          usuIngreso,

          perfilId,
          usuId,
        } = data;
        db.query(
          query,
          [
            usuTipoDoc,
            usuNoDoc,
            usuGen,
            usuNom,
            usuEmail,
            usuContra,
            usuIngreso,
            perfilId,
            usuId,
          ],
          (err, result) => {
            if (result && result.affectedRows === 1) {
              resolve(result);
            } else {
              reject(err);
            }
          }
        );
      } catch (err) {
        console.log('Error en la consulta', err);
        reject(err);
      }
    });
  }

  static delete(data) {
    return new Promise((resolve, reject) => {
      try {
        const sql = 'DELETE FROM usuario WHERE usuId = ?';
        const { usuId } = data;

        db.query(sql, [usuId], (err, result) => {
          if (result && result.affectedRows === 1) {
            resolve(result);
          } else {
            reject(err);
          }
        });
      } catch (err) {
        console.log('error', err);
        reject(err);
      }
    });
  }
}

export default UserModel;
