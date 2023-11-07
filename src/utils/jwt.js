/** @format */

import jwt from 'jsonwebtoken'

function generateToken(payload, secretKey) {
	return new Promise((resolve, reject) => {
		try {
			jwt.sign({ payload }, secretKey, { expiresIn: '2h', algorithm: process.env.ALGORITHM }, (err, token) => {
				if (err) {
					reject(err)
				} else {
					resolve(token)
				}
			})
		} catch (error) {
			reject(error)
		}
	})
}

const authToken = async (token) => {
	return new Promise((resolve, reject) => {
		try {
			token = token.split(' ')[1]
			jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
				if (err) reject(new Error(err))
				else resolve(data)
			})
		} catch (error) {
			console.log(error)
			reject(error)
		}
	})
}

export { generateToken, authToken }
