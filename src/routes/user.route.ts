import { bcrypt } from 'bcrypt';
/** @format */

import express, { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { verifyToken } from '../middlewares/auth';
import multer from 'multer';
import { Usuario } from 'index';

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req: Request, file, cb) {
		cb(null, 'uploads');
	},
	filename: function (req: Request, file, cb) {
		const ext = file.originalname.split('.').pop();
		cb(null, `prod_${req.body.prodId}.${ext}`);
	},
});

const upload = multer({ storage: storage });

router.get('/getAll', verifyToken(process.env.SECRET_KEY), (req: Request, res: Response) => {
	UserModel.getAll()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			res.status(400).json({
				error: 'Fallo en intentar obtener los usuarios',
				mesage: error,
			});
		});
});

router.post('/getOne', verifyToken(process.env.SECRET_KEY), (req: Request, res: Response) => {
	const cont = req.body;
	UserModel.getOne(cont)
		.then((user: any) => {
			if (user.length === 0) res.status(500).json({ message: 'fallo en obtener el resultado' });
			else res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json({ error: 'Fallo en intentar buscar al usuario', message: err.message });
		});
});

router.post('/crear', verifyToken(process.env.SECRET_KEY), upload.single('usuImg'), async (req: Request, res: Response) => {
	try {
		const cont: Usuario = req.body;
		const imgPath: string = req.file?.originalname ?? (cont.usuGen === 1 ? 'icon-male-100-png' : 'icon-female-100.png');
		const hashedPass = await bcrypt.hash(cont.usuContra, 10);

		const usuData: Usuario = {
			...cont,
			usuContra: hashedPass,
			usuImg: imgPath,
		};
		await UserModel.create(usuData);
		res.status(200).json({ message: 'Registro realizado exitosamente' });

		UserModel.create(usuData)
			.then((respuesta) => {
				res.status(200).json({ message: respuesta });
			})
			.catch((err) => {});
	} catch (_error) {
		res.status(400).json({ error: 'No se pudo crear al usuario', message: _error.message });
	}
});

router.put('/actualizar', verifyToken(process.env.SECRET_KEY), (req: Request, res: Response) => {
	const cont = req.body;
	UserModel.update(cont)
		.then((respuesta) => {
			res.status(200).json({
				message: 'Usuario actualizado correctamente',
				content: respuesta,
			});
		})
		.catch((err) => {
			res.status(500).json({ error: 'No se pudo actualizar a el usuario', message: err.message });
		});
});
// http://localhost:5000/api/usuario/borrar/#
router.delete('/borrar/:usuId', verifyToken(process.env.SECRET_KEY), (req: Request, res: Response) => {
	const cont = req.params;
	UserModel.delete(cont)
		.then((respuesta) => {
			res.status(200).json({
				message: 'Usuario eliminado',
				content: respuesta,
			});
		})
		.catch((err) => {
			res.status(400).json({
				error: 'Error al eliminar al usuario',
				message: err,
			});
		});
});

export default router;
