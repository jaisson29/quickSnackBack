import * as jose from 'jose'

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
)
const alg = 'HS256'

const jwt = await new jose.SignJWT({ 'urn:example:claim': true, "username": "jay" })
  .setProtectedHeader({ alg })
  .setIssuedAt()
  .setIssuer('qs')
  .setAudience('user')
  .setExpirationTime('2h')
  .sign(secret)

console.log(jwt)