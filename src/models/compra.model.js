import { db } from '../config/db.js';

class CompraModel{
  static getAll(){
    return new Promise((resolve, reject) => {
      try {
        const query ='SELECT c.compraId, c.provId, c.fechaCompra, p.provNom FROM compra AS c INNER JOIN proveedor AS p ON c.provId=p.provId'
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        reject(err)
      }
      });
  }
  static create(data){
    return new Promise ((resolve, reject) => {
      try{
        const query ='INSERT INTO compra ( provId, fechaCompra) VALUES (?,?)'
        const { provId, fechaCompra } = data
        db.query(
          query,
          [provId, fechaCompra],
          (err, result) => {
            if (result && result.afecttedRows === 1){
              resolve(result)
            }else{
              reject(new Error(err))
            }
          }
        )
      }catch (err){
        reject (err)
      }
    })
  }
    static editar(data){
      return new Promise ((resolve, reject) =>{
        const query = 'UPDATE compra SET provId = ?, fecCompra = ? WHERE compraId = ?';
        const {provId, fecCompra} = data;
        db.query(query, [provId, fecCompra],
          (err, result) => {
            if(result.affectedRows == 1){
              resolve(`se actualizo ${result.affectedRows} registro`);
            } else {
              reject(new Error(err));
            }
          })
      });
    }
  static eliminar(data){   
    return new Promise ((resolve, reject) =>{
      try{
        const query = 'DELETE  FROM compra WHERE compraId = ?'
        const { compraId } = data
        db.query(query, [compraId], (err, result) => {
          if(result.affectedRows === 1) {
            resolve(`Se elimino ${result.affectedRows}`)
          } else {
            reject(new Error(err))
          }
        })
      } catch (err) {
        reject (err)
      }
    })

    }
}

export default CompraModel