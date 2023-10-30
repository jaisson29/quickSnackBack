/** @format */

import express from 'express'
import UserModel from '../models/user.model.js'
import { generateToken, verifyToken } from '../utils/jwt.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/verify', async (req, res) => {
	const head = req.headers.authorization
	verifyToken(head)
		.then((verificado) => {
			res.status(200).json(verificado)
		})
		.catch((err) => {
			res.json({ error: err })
		})
})

router.post('/loguear', async (req, res) => {
	const cont = req.body
	UserModel.getOneXEmailXContra({
		usuEmail: cont.usuEmail,
	})
		.then(async (usuario) => {
			if (usuario.length !== 0 && (await bcrypt.compare(cont.usuContra, usuario[0].usuContra))) {
				generateToken(usuario)
					.then((usuToken) => {
						res.status(200).json({ token: usuToken, pg: usuario.paginaRuta })
					})
					.catch((err) => {
						res.status(500).json({ error: 'No se pudo generar el token', message: err })
					})
			} else {
				res.status(400).json({
					error: 'No existe un usuario con las credenciales enviadas',
					message: usuario,
				})
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err })
		})
})

router.post('/crearUsu', async (req, res) => {
	const cont = req.body
	UserModel.create({
		...cont,
		usuContra: await bcrypt
			.hash(cont.usuContra, 10)
			.then((hash) => {
				return hash
			})
			.catch((err) => {
				throw new Error(err)
			}),
		usuIngreso: new Date(),
		perfilId: 2,
	})
		.then((usuario) => {
			res.status(200).json({ response: usuario, message: 'Usuario creado exitosamente' })
		})
		.catch((error) => {
			res.status(401).json({
				error: 'Faltan credenciales para crear al ususario',
				message: error,
			})
		})
})

export default router
