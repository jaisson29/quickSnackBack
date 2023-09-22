import 'dotenv/config';
import jwt from 'jsonwebtoken';

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjpbeyJ1c3VJZCI6MywidXN1VGlwb0RvYyI6NCwidXN1R2VuIjoxLCJ1c3VOb20iOiJEYW5pZWwiLCJ1c3VFbWFpbCI6ImRhbkBvdXRsbG9rLmNvbSIsInVzdUNvbnRyYSI6IjEyMzQ5IiwidXN1SW5ncmVzbyI6IjIwMjMtMDctMjNUMTc6Mjk6MzQuMDAwWiIsInVzdUltZyI6bnVsbCwicGVyZmlsTm9tIjoiQWRtaW5pc3RyYWRvciIsInBlcmZpbElkIjoxLCJ1c3VGZWNoYSI6bnVsbCwidXN1UGFzc0NvZGUiOm51bGx9XSwiaWF0IjoxNjk1NDE3NjE3LCJleHAiOjE2OTU0MjQ4MTd9.W3bsG--48lCgWwRzcG-k0MVVHiF4qYECylOv6KLskxY';
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });
};

(async function () {
  try {
    const data = await verifyToken(token);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();
