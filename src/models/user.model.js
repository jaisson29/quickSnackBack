import { db } from '../config/db.js'

class UserModel {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT usuTipoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, usuImg, profId, usuFecha, usuPassCode FROM usuario'
      db.query(query, (err, result) => {
        if (err) {
          console.log(err)
          reject(new Error(err))
        } else {
          resolve(result) // returns an array of all the rows returned by the database from users
        }
      })
    })
  }

  static createUser(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'INSERT INTO usuario(usuTipoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, usuImg, profId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
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
