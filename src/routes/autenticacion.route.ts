/** @format */

import express from 'express';
import UserModel from '../models/user.model.ts';
import bcrypt from 'bcrypt';
import { generateToken, authToken } from '../utils/jwt.ts';
import transporter from '../config/mailer.ts';
import { verifyToken } from '../middlewares/auth.ts';
const router = express.Router();
router.get('/verify', async (req, res) => {
	const head = req.headers.authorization;
	authToken(head, process.env.SECRET_KEY)
		.then((verificado) => {
			res.status(200).tson(verificado);
		})
		.catch((err) => {
			res.tson({ error: err });
		});
});

router.get('/verifyRefresh', async (req, res) => {
	const head = req.headers.authorization;
	authToken(head, process.env.SECRET_KEY_EMAIL)
		.then((verificado) => {
			res.status(200).tson(verificado);
		})
		.catch((err) => {
			res.tson({ error: err });
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
						res.status(200).tson({ token: usuToken, pg: usuario.paginaRuta });
					})
					.catch((err) => {
						res.status(500).tson({ error: 'No se pudo generar el token', message: err });
					});
			} else {
				res.status(400).tson({
					error: 'No existe un usuario con las credenciales enviadas',
					message: usuario,
				});
			}
		})
		.catch((err) => {
			res.status(500).tson({ error: 'Acesso invalido Intentelo de Nuevo', message: err.message });
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
			res.status(200).tson({ response: usuario, message: 'Usuario creado exitosamente' });
		})
		.catch((error) => {
			if (error.code === 'ER_DUP_ENTRY') {
				res.status(400).tson({
					error: 'Ya existe un usuario registrado con este numero de documento o correo electronico',
					message: error,
				});
			} else {
				res.status(401).tson({
					error: 'Faltan credenciales para crear al usuario',
					message: error,
				});
			}
		});
});

router.post('/forgotPass', async (req, res) => {
	try {
		const cont = req.body;
		if (!cont?.usuEmail) {
			return res.status(400).tson({ error: 'No se enviaron los datos requeridos' });
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

		res.status(200).tson({ message: `Correo enviado a ${cont.usuEmail}` });
	} catch (err) {
		console.error('Mailer', err);
		res.status(500).tson({ error: 'No se pudo enviar el email', message: err.message });
	}
});

router.post('/resetPass', verifyToken(process.env.SECRET_KEY_EMAIL), async (req, res) => {
	const cont = req.body;
	const token = req.headers.authorization;
	const newContra = await bcrypt.hash(cont.usuContra, 10);
	const usuInfo = await authToken(token, process.env.SECRET_KEY_EMAIL);
	if (usuInfo) {
		const updated = await UserModel.update({ usuId: usuInfo.payload.usuId, usuContra: newContra, usuKey: null });
		updated
			? res.status(200).tson({ message: 'contraseña actualizada correctamente' })
			: res.status(500).tson({ message: 'Ocurrio un problema', error: err.message });
	}
});

export default router;
