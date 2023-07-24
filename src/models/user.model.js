import { db } from '../config/db.js'

class UserModel {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM user'
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(new Error(err))
        } else {
          resolve(result) // returns an array of all the rows returned by the database from users

        }
      })
    })
  }
}

export default UserModel
