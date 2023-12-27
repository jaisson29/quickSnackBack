/** @format */
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import ProductRoutes from './routes/product.route';
import UserRoutes from './routes/user.route';
import PaginaRoutes from './routes/pagina.route';
import Autenticacion from './routes/autenticacion.route';
import PerfilRoutes from './routes/perfil.route';
import TransacRouter from './routes/transac.router';
import CategoRouter from './routes/categoria.route';
import CompraRoutes from './routes/compra.route';
import DetVentaRouter from './routes/detVenta.router';
import morgan from 'morgan';

//instancias
const app: Application = express();

app.use('/uploads', express.static('uploads'));

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

app.use('/api/perfil/', PerfilRoutes);
app.use('/api/compra/', CompraRoutes);
app.use('/api/producto/', ProductRoutes);
app.use('/api/usuario/', UserRoutes);
app.use('/api/pagina/', PaginaRoutes);
app.use('/api/auth/', Autenticacion);
app.use('/api/transac/', TransacRouter);
app.use('/api/catego/', CategoRouter);
app.use('/api/detventa/', DetVentaRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).send({ message: 'Algo salió mal', codigo: 1005, error: err });
});

export default app;

