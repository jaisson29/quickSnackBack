import 'dotenv/config'
import jwt from 'jsonwebtoken'

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqYXkiLCJlbWFpbCI6ImphaXNAZ21haWwuY29tIiwicGhvbmUiOiIxMjM0NTYiLCJsYXN0TG9naW4iOiIyMDIzLTA3LTIzIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE2OTI4NDcwNTUsImV4cCI6MTY5Mjg1NDI1NX0.WRhEJ7dfFlgfppKLaSSUoanpcLFkU3vL3tJ5GePb6r0'
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) reject(err)
      else resolve(payload)
    })
  })
}

;(async function () {
  try {
    const data = await verifyToken(token)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
})()
