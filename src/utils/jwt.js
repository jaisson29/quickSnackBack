import 'dotenv/config';
import jwt from 'jsonwebtoken';

const alg = 'HS256';

export const generateToken = async (payload) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.sign(
        { payload },
        process.env.SECRET_KEY,
        { expiresIn: '2h', algorithm: alg },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const verifyToken = (token) => {
  token = token.split(' ')[1];
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) reject(new Error({ isAuth: false, error }));
        else resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};
