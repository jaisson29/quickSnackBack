/** @format */

import express from 'express'
import Mcat from '../models/mcat.ts'
import { verifyToken } from '../middlewares/auth.ts'

const router = express.Router()

router.get('/getAll', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	try {
		const categorias = await Mcat.getAll()
		res.tson(categorias)
	} catch (error) {
		res.tson(error)
	}
})

router.post('/create', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	const cont = req.body
	Mcat.create(cont)
		.then((create) => {
			res.tson(create)
		})
		.catch((error) => {
			res.tson({
				code: 500,
				error: 'Fallo la creacion de la categoria',
				message: error,
			})
		})
})
router.put('/update', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	const cont = req.body
	try {
		const update = await Mcat.update(cont)
		res.tson(update)
	} catch (error) {
		res.tson('Fallo la actualizacion de la categoria')
	}
})

router.delete('/delete/:catId', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	const cont = req.params
	try {
		const del = await Mcat.delete({
			catId: cont.catId,
		})
		res.tson(del)
	} catch (error) {
		res.tson('Fallo al eliminar la categoria')
	}
})

router.get('/getmxp', async (req, res) => {
	try {
		Mcat.getMxP().then((result) => {
			res.status(200).tson(result)
		})
	} catch (error) {
		console.log(error)
		res.tson(error)
	}
})
export default router
