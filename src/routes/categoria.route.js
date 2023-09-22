import express from 'express'
import Mcat from '../models/mcat.js'
import verifyToken from '../middlewares/auth.js'
import { error } from 'console'

const router = express.Router()

router.get('/getAll',verifyToken(process.env.SECRET_KEY), async (req, res) => {
  try {
    const Categorias = await Mcat.getAll()
    res.json(Categorias)
  } catch (error) {
    res.json(error)
  }
})


router.post('/create', verifyToken(process.env.SECRET_KEY), async (req, res) => {
    const cont = req.body
    Mcat.create()
    .then((create) =>{
        res.json(create)
    })
    .catch((error) =>{
        res.json({
            code:500,
            error:'Fallo la creacion de la categoria',
            message: error,
        })
    })
})
 router.put(
    '/update',
    verifyToken(process.env.SECRET_KEY),
    async (req, res) => {
        const cont = req.body
        try{
            const update = await Mcat.update()
            res.json(update)
        }catch (error){
            res.json('Fallo la actualizacion de la categoria')
        }
    }
 )

 router.delete(
    '/delete/:catId',
    verifyToken(process.env.SECRET_KEY),
    async (req, res) => {
        const cont = req.params
        console.log(cont)
        try{
            const del = await Mcat.delete({
                catId: cont.catId,
            })
            res.json(del)
        } catch(error){
            res.json('Fallo al eliminar la categoria')
        }
    }
 )

export default router
