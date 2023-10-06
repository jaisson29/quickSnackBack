import express from 'express';
import cors from 'cors';
import ProductRoutes from './routes/product.route.js';
import UserRoutes from './routes/user.route.js';
import PaginaRoutes from './routes/pagina.route.js';
import LoginRoutes from './routes/login.route.js';
import PerfilRoutes from './routes/perfil.route.js';
import TransacRouter from './routes/transac.router.js';
import CategoRouter from './routes/categoria.route.js';

//instancias
const app = express()

app.use('/uploads', express.static('uploads'))

app.use(cors('*'))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    value: 'Hello',
    value2: 'World!',
  })
})

app.use('/api/perfil/', PerfilRoutes);
app.use('/api/producto/', ProductRoutes);
app.use('/api/usuario/', UserRoutes);
app.use('/api/pagina/', PaginaRoutes);
app.use('/api/login/', LoginRoutes);
app.use('/api/transac/', TransacRouter);
app.use('/api/catego/', CategoRouter);

export default app
