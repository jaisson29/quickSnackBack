import { db } from '../config/db.js'

class UserModel {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT usu.usuId, usu.usuTipoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuFecha, usu.usuPassCode ' +
        'FROM usuario AS usu ' +
        'INNER JOIN perfil AS per ' +
        'ON usu.perfilId = per.perfilId '
      try {
        db.query(query, (err, result) => {
          if (err) {
            console.log(err)
            reject(new Error(err))
          } else {
            resolve(result) // returns an array of all the rows returned by the database from users
          }
        })
      } catch (error) {
        reject(new Error(`${error}`))
      }
    })
  }

  static getOneXId(data) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT usu.usuId, usu.usuTipoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuFecha, usu.usuPassCode ' +
        'FROM usuario AS usu ' +
        'INNER JOIN perfil AS per ' +
        'ON usu.perfilId = per.perfilId ' +
        'WHERE usu.usuId = ? '
      try {
        db.query(sql, [data.usuEmail, data.usuContra], (err, result) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve(result)
          }
        })
      } catch (error) {
        reject(new Error(`${error}`))
      }
    })
  }

  static getOneXEmailXContra(data) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT usu.usuId, usu.usuTipoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuFecha, usu.usuPassCode ' +
        'FROM usuario AS usu ' +
        'INNER JOIN perfil AS per ' +
        'ON usu.perfilId = per.perfilId ' +
        'WHERE usuEmail = ? AND usuContra = ?'
      db.query(sql, [data.usuEmail, data.usuContra], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static createUser(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      try {
        const query =
          'INSERT INTO usuario(usuTipoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId) VALUES (?, ?, ?, ?, ?, ?, ?)'
        db.query(
          query,
          [
            data.usuTipoDoc,
            data.usuGen,
            data.usuNom,
            data.usuEmail,
            data.usuContra,
            data.usuIngreso,
            data.perfilId,
          ],
          (err, result) => {
            if (result && result.affectedRows === 1) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          }
        )
      } catch (error) {
        throw new Error(error)
      }
    })
  }
}

export default UserModel
