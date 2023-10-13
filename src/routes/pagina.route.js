import express from 'express';
import PaginaModel from '../models/pagina.model.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/getAll', async (req, res) => {
  try {
    const cont = req.params;
    const paginas = await PaginaModel.getAll(cont);
    res.json(paginas);
  } catch (error) {
    res.json(error);
  }
});

router.post('/create', verifyToken(process.env.SECRET_KEY), async (req, res) => {
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

router.delete(
  '/delete/:paginaId',
  verifyToken(process.env.SECRET_KEY),
  async (req, res) =>{
    const cont = req.params
    try{
      const del = await PaginaModel.delete({
        paginaId: cont.paginaId,
      })
      res.json(del)
    } catch(error){
      res.json('Fallo al eliminar la pagina')
    }
  }
)

router.get(
  '/getpagxpef',
  async (req, res) =>{
    try{
      PaginaModel.getPagxpef().then((result) =>{
        res.status(200).json(result)
      })
    }catch(error){
      console.log(error)
      res.json(error)
    }
  }
)

router.get('/getAll/:perfilId', async (req, res) => {
  try {
    const cont = req.params;
    const paginas = await PaginaModel.getPefPag(cont);
    res.json(paginas);
  } catch (error) {
    res.json(error);
  }
});

export default router;
