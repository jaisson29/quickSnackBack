import { db } from '../config/db.js';

class ProductModel {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen FROM producto';

      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }

  static createProduct(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'INSERT INTO producto (catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen) VALUES (?, ?, ?, ?, ?, ?)';

        db.query(
          query,
          [
            data.catId,
            data.prodNom,
            data.prodDescr,
            data.prodImg,
            data.prodValCom,
            data.prodValVen,
          ],
          (err, result) => {
            if (result && result.affectedRows === 1) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          }
        );
      } catch (err) {
        reject({ error: 'fallo en crear el producto', message: err });
      }
    });
  }

  static updateProduct(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'UPDATE producto' +
          ' ' +
          'SET catId = ?, prodNom = ?, prodDescr = ?, prodImg = ?, prodValCom = ?, prodValVen = ?' +
          ' ' +
          'WHERE prodId = ?';
        db.query(
          query,
          [
            data.catId,
            data.prodNom,
            data.prodDescr,
            data.prodImg,
            data.prodValCom,
            data.prodValVen,
            data.prodId,
          ],
          (err, result) => {
            if (result.affectedRows == 1) {
              console.log(result);
              resolve(`Se actualizo ${result.affectedRows} registro`);
            } else {
              reject(new Error(err));
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  static deleteProduct(data) {
    return new Promise((resolve, reject) => {
      try {
        const query = 'DELETE FROM producto WHERE prodId = ?';

        db.query(query, [data.prodId], (err, result) => {
          console.log(result);
          if (result.affectedRows == 1) {
            console.log(result);
            resolve(`Se elimino ${result.affectedRows} registro`);
          } else {
            reject(new Error(err));
          }
        });
      } catch (error) {
        reject(new Error(error));
      }
    });
  }
}

export default ProductModel;
