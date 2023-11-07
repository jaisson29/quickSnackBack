/** @format */

import express, { response } from 'express'
import UserModel from '../models/user.model.js'
import verifyToken from '../middlewares/auth.js'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		const ext = file.originalname.split('.').pop()
		cb(null, `prod_${req.body.prodId}.${ext}`)
	},
})

const upload = multer({ storage: storage })

router.get('/getAll', async (req, res) => {
	UserModel.getAll()
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {
			res.status(400).json({
				error: 'Fallo en intentar obtener los usuarios',
				mesage: error,
			})
		})
})

router.post('/getOne', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	const cont = req.body
	UserModel.getOne(cont)
		.then((user) => {
			if (user.length === 0) res.status(500).json({ message: 'fallo en obtener el resultado' })
			else res.status(200).json(user)
		})
		.catch((err) => {
			res.status(500).json({ error: 'Fallo en intentar buscar al usuario', message: err })
		})
})

router.post('/crear', verifyToken(process.env.SECRET_KEY), upload.single('usuImg'), async (req, res) => {
	const cont = req.body
	const imgPath = req.file ? req.file.originalname : 'default-img.webp'
	const usuData = {
		...cont,
		usuImg: imgPath,
	}
	UserModel.create(usuData)
		.then((respuesta) => {
			res.status(200).json({ message: respuesta })
		})
		.catch((err) => {
			res.status(400).json({ error: 'No se pudo crear al usuario', message: err })
		})
})

// http://localhost:5000/api/usuario/actualizar

// {
// 	"usuTipoDoc": #,
//  "usuNoDoc":"...",
// 	"usuGen": #,
// 	"usuNom": "...",
// 	"usuEmail": "...",
// 	"usuContra": "...",
// 	"usuIngreso": "...",
// 	"perfilId" : #,
// 	"usuId": #
// }

router.put('/actualizar', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	const cont = req.body
	UserModel.update(cont)
		.then((respuesta) => {
			res.status(200).json({
				message: 'Usuario actualizado correctamente',
				content: respuesta,
			})
		})
		.catch((err) => {
			res.status(500).json({ error: 'No se pudo actualizar a el usuario', message: err })
		})
})
// http://localhost:5000/api/usuario/borrar/#
router.delete('/borrar/:usuId', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	const cont = req.params
	UserModel.delete(cont)
		.then((respuesta) => {
			res.status(200).json({
				message: 'Usuario eliminado',
				content: respuesta,
			})
		})
		.catch((err) => {
			res.status(400).json({
				error: 'Error al eliminar al usuario',
				message: err,
			})
		})
})

export default router
