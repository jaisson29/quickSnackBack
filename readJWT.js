import * as jose from 'jose'
const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
)
const jwt =
  'eyJhbGciOiJIUzI1NiJ9.eyJ1cm46ZXhhbXBsZTpjbGFpbSI6dHJ1ZSwidXNlcm5hbWUiOiJqYXkiLCJpYXQiOjE2ODk4MTY1OTksImlzcyI6InFzIiwiYXVkIjoidXNlciIsImV4cCI6MTY4OTgyMzc5OX0.5msTYLq-p0r7qcXyq3GDN4G_mM6ETbahadbPZpr7L5w'

const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
  issuer: 'qs',
  audience: 'user',
})

console.log(protectedHeader)
console.log("*************************************");
console.log(payload)
