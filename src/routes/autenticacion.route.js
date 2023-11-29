/** @format */

import express from 'express';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateToken, authToken } from '../utils/jwt.js';
import transporter from '../config/mailer.js';
import { verifyToken } from '../middlewares/auth.js';
const router = express.Router();
router.get('/verify', async (req, res) => {
	const head = req.headers.authorization;
	authToken(head, process.env.SECRET_KEY)
		.then((verificado) => {
			res.status(200).json(verificado);
		})
		.catch((err) => {
			res.json({ error: err });
		});
});

router.get('/verifyRefresh', async (req, res) => {
	const head = req.headers.authorization;
	authToken(head, process.env.SECRET_KEY_EMAIL)
		.then((verificado) => {
			res.status(200).json(verificado);
		})
		.catch((err) => {
			res.json({ error: err });
		});
});

router.post('/loguear', async (req, res) => {
	const cont = req.body;
	UserModel.getOneXEmailXContra({
		usuEmail: cont.usuEmail,
	})
		.then(async (usuario) => {
			if (usuario.length !== 0 && (await bcrypt.compare(cont.usuContra, usuario[0].usuContra))) {
				generateToken(usuario, process.env.SECRET_KEY)
					.then((usuToken) => {
						res.status(200).json({ token: usuToken, pg: usuario.paginaRuta });
					})
					.catch((err) => {
						res.status(500).json({ error: 'No se pudo generar el token', message: err });
					});
			} else {
				res.status(400).json({
					error: 'No existe un usuario con las credenciales enviadas',
					message: usuario,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'Acesso invalido Intentelo de Nuevo', message: err.message });
		});
});

router.post('/crearUsu', async (req, res) => {
	const cont = req.body;

	UserModel.create({
		...cont,
		usuIngreso: new Date(),
		perfilId: 2,
	})
		.then((usuario) => {
			res.status(200).json({ response: usuario, message: 'Usuario creado exitosamente' });
		})
		.catch((error) => {
			res.status(401).json({
				error: 'Faltan credenciales para crear al usuario',
				message: error,
			});
		});
});

router.post('/forgotPass', async (req, res) => {
	try {
		const cont = req.body;
		if (!cont?.usuEmail) {
			return res.status(400).json({ error: 'No se enviaron los datos requeridos' });
		}

		const usuario = await UserModel.getOne({ usuEmail: cont.usuEmail });
		const { usuId, usuEmail, usuNoDoc } = usuario;
		const token = await generateToken({ usuId, usuNoDoc, usuEmail }, process.env.SECRET_KEY_EMAIL);
		await UserModel.update({ usuKey: token, usuId: usuario.usuId });

		await transporter.sendMail({
			from: '"Recuperar su contraseña" <jayVal029@gmail.com>',
			to: `${cont.usuEmail}`,
			subject: 'Haz solicitado una nueva contraseña',
			text: 'Pulsa el boton para recuperar tu contraseña',
			html: `<a href="${process.env.FRONT_URL}/reset/${token}">Click</a>`,
		});

		res.status(200).json({ message: `Correo enviado a ${cont.usuEmail}` });
	} catch (err) {
		console.error('Mailer', err);
		res.status(500).json({ error: 'No se pudo enviar el email', message: err.message });
	}
});

router.post('/resetPass', verifyToken(process.env.SECRET_KEY_EMAIL), async (req, res) => {
	const cont = req.body;
	const token = req.headers.authorization;
	const newContra = await bcrypt.hash(cont.usuContra, 10);
	const usuInfo = await authToken(token, process.env.SECRET_KEY_EMAIL);
	if (usuInfo) {
		const updated = await UserModel.update({ usuId: usuInfo.payload.usuId, usuContra: newContra });
		updated
			? res.status(200).json({ message: 'contraseña actualizada correctamente' })
			: res.status(500).json({ message: 'Ocurrio un problema', error: err.message });
	}
});

export default router;
