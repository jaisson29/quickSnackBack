/** @format */

import express, { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { generateToken, authToken } from '../utils/jwt';
import transporter from '../config/mailer';
import { verifyToken } from '../middlewares/auth';
const router = express.Router();
router.get('/verify', async (req: Request, res: Response) => {
	try {
		const head = req.headers.authorization as string;
		const verificado = await authToken(head, process.env.SECRET_KEY as string);
		res.status(200).json(verificado);
	} catch (err: any) {
		res.json({ error: err });
	}
});

router.get('/verifyRefresh', (req: Request, res: Response) => {
	const head = req.headers.authorization as string;
	authToken(head, process.env.SECRET_KEY_EMAIL as string)
		.then((verificado) => {
			res.status(200).json(verificado);
		})
		.catch((err) => {
			res.json({ error: err });
		});
});

router.post('/loguear', (req: Request, res: Response) => {
	const cont = req.body;
	UserModel.getOneXEmailXContra({
		usuEmail: cont.usuEmail,
	})
		.then(async (usuario: any) => {
			if (usuario.length !== 0 && (await bcrypt.compare(cont.usuContra, usuario[0].usuContra))) {
				try {
					const usuToken: string = generateToken(usuario, process.env.SECRET_KEY as string);
					res.status(200).json({ token: usuToken, pg: usuario.paginaRuta });
				} catch (err: any) {
					res.status(500).json({ error: 'No se pudo generar el token', message: err });
				}
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

router.post('/crearUsu', (req: Request, res: Response) => {
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
			if (error.code === 'ER_DUP_ENTRY') {
				res.status(400).json({
					error: 'Ya existe un usuario registrado con este numero de documento o correo electronico',
					message: error,
				});
			} else {
				res.status(401).json({
					error: 'Faltan credenciales para crear al usuario',
					message: error,
				});
			}
		});
});

router.post('/forgotPass', async (req: Request, res: Response) => {
	try {
		const cont = req.body;
		if (!cont?.usuEmail) {
			return res.status(400).json({ error: 'No se enviaron los datos requeridos' });
		}

		const usuario: any = await UserModel.getOne({ usuEmail: cont.usuEmail });
		const { usuId, usuEmail, usuNoDoc } = usuario;
		const token = generateToken({ usuId, usuNoDoc, usuEmail }, process.env.SECRET_KEY_EMAIL as string);
		await UserModel.update({ usuKey: token, usuId: usuario.usuId });

		await transporter.sendMail({
			from: '"Recuperar su contraseña" <jayVal029@gmail.com>',
			to: `${cont.usuEmail}`,
			subject: 'Haz solicitado una nueva contraseña',
			text: 'Pulsa el boton para recuperar tu contraseña',
			html: `<a href="${process.env.FRONT_URL}/reset/${token}">Click</a>`,
		});

		res.status(200).json({ message: `Correo enviado a ${cont.usuEmail}` });
	} catch (err: any) {
		console.error('Mailer', err);
		res.status(500).json({ error: 'No se pudo enviar el email', message: err.message });
	}
});

router.post('/resetPass', verifyToken(process.env.SECRET_KEY_EMAIL), async (req: Request, res: Response): Promise<void> => {
	try {
		const cont = req.body;
		const token = req.headers.authorization as string;
		const newContra = await bcrypt.hash(cont.usuContra, 10);
		const usuInfo: any = await authToken(token, process.env.SECRET_KEY_EMAIL as string);
		if (usuInfo) {
			const updated = await UserModel.update({ usuId: usuInfo.payload.usuId, usuContra: newContra, usuKey: null });
			if (updated) res.status(200).json({ message: 'contraseña actualizada correctamente' });
		}
	} catch (error: any) {
		res.status(500).json({ message: 'Ocurrio un problema', error: error.message });
	}
});

export default router;

