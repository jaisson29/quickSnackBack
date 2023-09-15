import { db } from '../config/db.js';

class CompraModel{

    static getAll(){
        return new Promise((resolve, reject) => {
            try {
              const query =
                'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc , usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuFecha, usu.usuPassCode ' +
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
    static getOne(){

    }
    static editar(){

    }
    static eliminar(){

    }
}