/** @format */

import bcrypt from 'bcrypt'

bcrypt.hash('12349', 10).then((hash, err) => {
	console.log(hash)
	bcrypt.compare('12349', hash).then((rs, err) => {
		console.log(rs)
	})
})
