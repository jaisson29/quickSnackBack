import * as jose from 'jose'
const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
)
const jwt =
  'eyJhbGciOiJIUzI1NiJ9.eyJ1cm46ZXhhbXBsZTpjbGFpbSI6dHJ1ZSwidXNlcm5hbWUiOiJqYXkiLCJpYXQiOjE2ODk4ODc5ODgsImV4cCI6MTY4OTg5NTE4OH0.GFx2Xmkh9N7-SK1SikK2SuxyyOYQA4m5fGHHGnRwLbI'

const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret)

console.log(protectedHeader)
console.log("*************************************");
console.log(payload)
