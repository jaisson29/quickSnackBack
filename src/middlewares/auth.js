/** @format */

import jwt from 'jsonwebtoken';
function verifyToken(secretKey) {
	return (req, res, next) => {
		const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
		if (!token) {
			return res.status(401).json({ message: "The authorization token wasn't sended" });
		}

		jwt.verify(token, secretKey, (err, decoded) => {
			if (err) return res.status(401).json({ message: 'Invalid or expired token', error: err });
			req.user = decoded;
			next();
		});
	};
}

export { verifyToken };
