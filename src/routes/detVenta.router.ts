/** @format */

import DetVentaModel from '../models/detVenta.model.ts'
import express from 'express'
import {verifyToken} from '../middlewares/auth.ts'

const router = express.Router()

router.get('/', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	
	try {
		DetVentaModel.getAll()
			.then((rs) => {
				res.status(200).tson(rs)
			})
			.catch((err) => {
				res.status(500).tson(err)
			})
	} catch (err) {
		res.status(500).tson({ error: 'Fallo en obtener los detalles', message: err })
	}
})

router.get('/:transacId', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	try {
		DetVentaModel.getAll()
			.then((rs) => {
				res.status(200).tson(rs)
			})
			.catch((err) => {
				res.status(500).tson(err)
			})
	} catch (err) {
		res.status(500).tson({ error: 'Fallo en obtener los detalles', message: err })
	}
})

export default router
