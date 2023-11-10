/** @format */

import express from 'express'
import ProductModel from '../models/product.model.js'
import { verifyToken } from '../middlewares/auth.js'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		const ext = file.originalname.split('.').pop()
		cb(null, file.originalname)
	},
})

const upload = multer({ storage: storage })

router.get('/getAll', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	try {
		const products = await ProductModel.getAll()
		res.json(products)
	} catch (error) {
		res.json({ code: 500, error: 'Failed to load the products' })
	}
})

router.get('/getAll/:catId', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	const cont = req.params
	try {
		ProductModel.getAllXCat(cont)
			.then((result) => {
				res.status(200).json(result)
			})
			.catch((err) => {
				res.status(500).json({ error: err.message, mensaje: err.name })
			})
	} catch (error) {
		res.json({ code: 500, error: 'Algo fallo en obtener los productos por esta categoria' })
	}
})

router.get('/getVenXProd', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	try {
		ProductModel.getVenXProd()
			.then((result) => {
				res.status(200).json(result)
			})
			.catch((err) => {
				res.json({ error: err.message, mensaje: err.name, codigo: err.cod })
			})
	} catch (error) {
		res.json({ code: 500, error: 'Fallo en encontrar las relaciones' })
	}
})

router.post('/create', verifyToken(process.env.SECRET_KEY), upload.single('prodImg'), async (req, res) => {
	const cont = req.body
	const imgPath = req.file ? req.file.originalname : 'default-img.webp'
	const prodData = {
		...cont,
		prodImg: imgPath,
	}
	ProductModel.create(prodData)
		.then((create) => {
			res.json(create)
		})
		.catch((err) => {
			res.json({
				code: 500,
				error: 'Failed to create a new product',
				message: err,
			})
		})
})

router.put('/update', verifyToken(process.env.SECRET_KEY), upload.single('usuImg'), async (req, res) => {
	const cont = req.body
	const imgPath = req.file ? req.file.originalname : cont.usuImg
	const newProdData = {
		...cont,

		usuImg: imgPath,
	}
	try {
		const update = await ProductModel.update(newProdData)

		res.json(update)
	} catch (error) {
		res.json('Failed to update the product')
	}
})

router.delete('/delete/:prodId', verifyToken(process.env.SECRET_KEY), async (req, res) => {
	const cont = req.params
	try {
		const del = await ProductModel.delete({
			prodId: cont.prodId,
		})
		res.json(del)
	} catch (error) {
		res.json('Failed to delete the product')
	}
})

export default router
