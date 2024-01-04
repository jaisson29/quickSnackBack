import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
/** @format */

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
function verifyToken(secretKey: string = process.env.SECRET_KEY as string) {
	return (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers['authorization']?.replace('Bearer ', '');
		if (!token) {
			return res.status(401).json({ message: "The authorization token wasn't sended" });
		}

		const decoded = jwt.verify(token, secretKey);
		if (decoded) next();
		else res.status(400).json({ error: 'Sesión expirada', message: 'Vuelva a inciar sesión' });
	};
}

export { verifyToken };

