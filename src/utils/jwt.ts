/** @format */

import jwt, { Algorithm, JwtPayload } from 'jsonwebtoken';

function generateToken(payload: any, secretKey: string): string {
	try {
		const token = jwt.sign({ payload }, secretKey, { expiresIn: '2h', algorithm: process.env.ALGORITHM as Algorithm });
		return token;
	} catch (error: any) {
		return error;
	}
}

function authToken(token: string, secretKey: string): JwtPayload | string {
	try {
		token = token.replace('Bearer ', '');
		const decoded = jwt.verify(token, secretKey);
		return decoded;
	} catch (e: any) {
		// console.error(e);
		return e;
	}
}

export { generateToken, authToken };

