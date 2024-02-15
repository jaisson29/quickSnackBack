/** @format */

import express, { Request, Response } from 'express'
import PaginaModel from '../models/pagina.model'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.get('/getAll/:perfilId', async (req:Request, res:Response) => {
	try {
		const cont = req.params
		const paginas = await PaginaModel.getAll(cont)
		res.json(paginas)
	} catch (error) {
		res.json(error)
	}
})

router.post('/create', verifyToken(process.env.SECRET_KEY), async () => {})

export default router
