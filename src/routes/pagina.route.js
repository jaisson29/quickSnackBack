import express from 'express';
import PaginaModel from '../models/pagina.model.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/getAll/:perfilId', async (req, res) => {
  try {
    const cont = req.params;
    const paginas = await PaginaModel.getAll(cont);
    res.json(paginas);
  } catch (error) {
    res.json(error);
  }
});

router.post('/create', verifyToken(process.env.SECRET_KEY), async () => {
  const cont = req.body
  PaginaModel.create(cont)
  .then((create) =>{
    res.json(create)
  })
  .catch((error) =>{
    res.json({
      code:500,
      error:'Fallo la creacion de la pagina',
      message: error,
    })
  })
});

router.put(
  '/update',
  verifyToken(process.env.SECRET_KEY),
  async(req, res) =>{
    const cont = req.body
    try{
      const update = await PaginaModel.update(cont)
      res.json(update)
    }catch(error){
      res.json('Fallo la actualizacion de la pagina')
    }
  }
)

export default router;
