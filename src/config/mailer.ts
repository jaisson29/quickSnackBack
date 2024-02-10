/** @format */

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAILAPI_USER,
		pass: process.env.EMAILAPI_PASS,
	}
});

transporter.verify(() => {
	console.log('Ready');
});

export default transporter;

