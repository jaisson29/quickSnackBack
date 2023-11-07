/** @format */

import DetVentaModel from '../models/detVenta.model.js'
import express from 'express'
import verifyToken from '../middlewares/auth.js'

const router = express.Router()

router.get('/', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	try {
		DetVentaModel.getAll()
			.then((rs) => {
				res.status(200).json(rs)
			})
			.catch((err) => {
				res.status(500).json(err)
			})
	} catch (err) {
		res.status(500).json({ error: 'Fallo en obtener los detalles', message: err })
	}
})

router.get('/:transacId', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	try {
		DetVentaModel.getAll()
			.then((rs) => {
				res.status(200).json(rs)
			})
			.catch((err) => {
				res.status(500).json(err)
			})
	} catch (err) {
		res.status(500).json({ error: 'Fallo en obtener los detalles', message: err })
	}
})

export default router
