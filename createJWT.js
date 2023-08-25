import 'dotenv/config'
import jwt from 'jsonwebtoken'

const alg = 'HS256'

const generateToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '2h', algorithm: alg },
      (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      }
    )
  })
}

console.log(
  await generateToken({
    id: 1,
    username: 'jay',
    email: 'jais@gmail.com',
    phone: '123456',
    lastLogin: '2023-07-23',
    rol: 'admin',
  })
)
