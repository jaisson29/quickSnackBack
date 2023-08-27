import 'dotenv/config';
import jwt from 'jsonwebtoken';

const alg = 'HS256';

export const generateToken = async (payload) => {
  console.log(payload);
  return new Promise((resolve, reject) => {
    try {
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: '2h', algorithm: alg },
        (err, token) => {
          console.log(err);
          if (err) {
            reject(err);
          } else {
            console.log(token);
            resolve(token);
          }
        }
      );
    } catch (error) {
      reject({ error: 'Fallo en crear el token', message: error });
    }
  });
};
// console.log('object');
// console.log(
//   await generateToken({
//     usuTipoDoc: 4,
//     usuGen: 1,
//     usuNom: 'Jay',
//     usuEmail: 'jais@outllok.com',
//     usuContra: '12349',
//     usuImg: 'imgPath',
//     perfilId: 1,
//     usuFecha: null,
//     usuPassCode: null,
//   })
// );
