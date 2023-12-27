/** @format */

import express from 'express'
import Mpef from '../models/perfil.model.ts'
import { verifyToken } from '../middlewares/auth.ts'

const router = express.Router()

router.get('/getAll', async (req, res) => {
	try {
		const perfiles = await Mpef.getAll()
		res.tson(perfiles)
	} catch (error) {
		res.tson(error)
	}
})

router.post('/create', verifyToken(process.env.SECRECT_KEY), async () => {})

export default router
