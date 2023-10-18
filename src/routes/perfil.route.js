import express from "express";
import Mpef from "../models/perfil.model.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.get('/getAll', async (req, res)  =>{
    try{
        const perfiles = await Mpef.getAll();
        res.json(perfiles);
    }catch(error){
        res.json(error);
    }

})

router.post('/create', verifyToken(process.env.SECRECT_KEY), async () => {
    const cont = req.body
    Mpef.create(cont)
    .then((create) =>{
        res.json(create)
    })
    .catch((error) =>{
        res.json({
            code:500,
            error:'Fallos la creacion del perfil',
            message: error,
        })
    })
});

router.put(
    '/update',
    verifyToken(process.env.SECRECT_KEY),
    async(req, res) =>{
        const cont = req.body
        try{
            const update = await Mpef.update(cont)
            res.json(update)
        }catch(error){
            res.json('Fallo la actualizacion del perfil')
        }
    }
);

export default router;