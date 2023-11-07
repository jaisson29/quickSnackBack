/** @format */

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		// TODO: replace `user` and `pass` values from <https://forwardemail.net>
		user: 'jayVal029@gmail.com',
		pass: process.env.EMAIL_API,
	},
})

await transporter.verify(async () =>{
  console.log("Ready")
})

export default transporter
