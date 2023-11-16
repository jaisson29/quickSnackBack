/** @format */

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		// TODO: replace `user` and `pass` values from <https://forwardemail.net>
		user: process.env.EMAILAPI_USER,
		pass: process.env.EMAILAPI_PASS,
	},
});

await transporter.verify(async () => {
	console.log('Ready');
});

export default transporter;
