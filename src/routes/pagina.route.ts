/** @format */

import express from 'express'
import PaginaModel from '../models/pagina.model.ts'
import { verifyToken } from '../middlewares/auth.ts'

const router = express.Router()

router.get('/getAll/:perfilId', async (req, res) => {
	try {
		const cont = req.params
		const paginas = await PaginaModel.getAll(cont)
		res.tson(paginas)
	} catch (error) {
		res.tson(error)
	}
})

router.post('/create', verifyToken(process.env.SECRET_KEY), async () => {})

export default router
