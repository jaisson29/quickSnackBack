/** @format */

import express, { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { generateToken, authToken } from '../utils/jwt';
import transporter from '../config/mailer';
import { verifyToken } from '../middlewares/auth';
import { Usuario } from 'index';
import { RowDataPacket } from 'mysql2';
const router = express.Router();

router.get('/verify', (req: Request, res: Response) => {
	try {
		const head = req.headers.authorization as string;
		const verificado = authToken(head, process.env.SECRET_KEY as string);
		if (verificado) {
			res.status(200).json(verificado);
		} else {
			throw new Error();
		}
	} catch (err: any) {
		res.json({ error: err });
	}
});

router.get('/verifyRefresh', (req: Request, res: Response) => {
	try {
		const head = req.headers.authorization as string;
		const verificado = authToken(head, process.env.SECRET_KEY_EMAIL as string);
		res.status(200).json(verificado);
	} catch (error) {
		res.json({ error: error });
	}
});

router.post('/loguear', async (req: Request, res: Response) => {
	try {
		const cont = req.body;
		const result = await UserModel.getOneXEmailXContra({
			usuEmail: cont.usuEmail,
		});
		if (result?.length !== 0 && (await bcrypt.compare(cont.usuContra, result[0]?.usuContra))) {
			const usuario = result[0]
			const usuToken: string = generateToken(usuario, process.env.SECRET_KEY as string);
			res.status(200).json({ token: usuToken, pg: usuario.paginaRuta });
		} else {
			res.status(400).json({
				error: 'Error de autenticación',
				message: 'No existe un usuario con las credenciales enviadas',
			});
		}
	} catch (_error: any) {
		console.error(_error);
		res.status(500).json({ error: 'Acesso invalido Intentelo de Nuevo', message: _error.message });
	}
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
			res.status(400).json({ error: 'No se enviaron los datos requeridos' });
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
		console.error('Mailer', err.message);
		res.status(500).json({ error: 'No se pudo enviar el email', message: err.message });
	}
});

router.post('/resetPass', verifyToken(process.env.SECRET_KEY_EMAIL), async (req: Request, res: Response) => {
	try {
		const cont = req.body;
		const token = req.headers.authorization as string;
		const newContra: string = await bcrypt.hash(cont.usuContra, 10);
		const usuInfo: any = authToken(token, process.env.SECRET_KEY_EMAIL as string);
		if (usuInfo) {
			const updated = await UserModel.update({ usuId: usuInfo.payload.usuId, usuContra: newContra, usuKey: null });
			if (updated) {
				res.status(200).json({ message: 'contraseña actualizada correctamente' });
			} else {
				res.status(500).json({ message: 'No se pudo actualizar la contraseña' });
			}
		}
	} catch (error: any) {
		res.status(500).json({ message: 'Ocurrió un problema al resetear la contraseña', error: error.message });
	}
});

export default router;
