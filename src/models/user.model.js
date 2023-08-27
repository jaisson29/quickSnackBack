import { db } from '../config/db.js';

class UserModel {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT usuId, usuTipoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, usuImg, perfilId, usuFecha, usuPassCode FROM usuario';
      try {
        db.query(query, (err, result) => {
          if (err) {
            console.log(err);
            reject(new Error(err));
          } else {
            resolve(result); // returns an array of all the rows returned by the database from users
          }
        });
      } catch (error) {
        reject(new Error(`${error}`));
      }
    });
  }

  static getOneXId(data) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT usuTipoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, usuImg, perfilId, usuFecha, usuPassCode FROM usuario WHERE usuId = ?';
      try {
        db.query(sql, [data.usuEmail, data.usuContra], (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        });
      } catch (error) {
        reject(new Error(`${error}`));
      }
    });
  }

  static getOneXEmailXContra(data) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT usuTipoDoc, usuGen, usuNom, usuEmail, usuContra, usuImg, perfilId, usuFecha, usuPassCode FROM usuario WHERE usuEmail = ? AND usuContra = ?';
      try {
        db.query(sql, [data.usuEmail, data.usuContra], (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        });
      } catch (error) {
        reject(new Error(`${error}`));
      }
    });
  }

  static createUser(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'INSERT INTO usuario(usuTipoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, usuImg, perfilId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
          query,
          [
            data.usuTipoDoc,
            data.usuGen,
            data.usuNom,
            data.usuEmail,
            data.usuContra,
            data.usuIngreso,
            data.usuImg,
            data.profId,
          ],
          (err, result) => {
            if (result.affectedRows === 1) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          }
        );
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}

export default UserModel;
