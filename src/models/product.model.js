import { db } from '../config/db.js';

class ProductModel {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT p.prodId, c.catNom, p.prodNom, p.prodDescr, p.prodImg, p.prodValCom, p.prodValVen ' +
        'FROM producto p ' +
        'INNER JOIN categoria c ' +
        'ON p.catId = c.catId';

      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
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

        const { catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen } =
          data;
        db.query(
          query,
          [catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen],
          (err, result) => {
            if (result && result.affectedRows === 1) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          }
        );
      } catch (err) {
        reject(err);
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
        const {
          catId,
          prodNom,
          prodDescr,
          prodImg,
          prodValCom,
          prodValVen,
          prodId,
        } = data;
        db.query(
          query,
          [catId, prodNom, prodDescr, prodImg, prodValCom, prodValVen, prodId],
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
        const { prodId } = data;

        db.query(query, [prodId], (err, result) => {
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
