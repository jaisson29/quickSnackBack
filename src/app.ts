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
import ProveedorRouter from './routes/proveedor.router';
import DominioRouter from './routes/dominio.router';
import ValorRouter from './routes/valor.router';
import morgan from 'morgan';
import { SendError } from './types';

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
app.use('/api/proveedor/', ProveedorRouter);
app.use('/api/dominio/', DominioRouter);
app.use('/api/valor/', ValorRouter);

app.use((_error: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(_error)
	const globalError: SendError = {
		message: 'Algo salio mal en la aplicación, intentelo mas tarde',
		error: _error.message,
	};
	res.status(500).json(globalError);
});

export default app;

