"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const pagina_route_1 = __importDefault(require("./routes/pagina.route"));
const autenticacion_route_1 = __importDefault(require("./routes/autenticacion.route"));
const perfil_route_1 = __importDefault(require("./routes/perfil.route"));
const transac_router_1 = __importDefault(require("./routes/transac.router"));
const categoria_route_1 = __importDefault(require("./routes/categoria.route"));
const compra_route_1 = __importDefault(require("./routes/compra.route"));
const detVenta_router_1 = __importDefault(require("./routes/detVenta.router"));
const morgan_1 = __importDefault(require("morgan"));
//instancias
const app = (0, express_1.default)();
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/perfil/', perfil_route_1.default);
app.use('/api/compra/', compra_route_1.default);
app.use('/api/producto/', product_route_1.default);
app.use('/api/usuario/', user_route_1.default);
app.use('/api/pagina/', pagina_route_1.default);
app.use('/api/auth/', autenticacion_route_1.default);
app.use('/api/transac/', transac_router_1.default);
app.use('/api/catego/', categoria_route_1.default);
app.use('/api/detventa/', detVenta_router_1.default);
app.use((err, req, res, next) => {
    res.status(500).send({ message: 'Algo salió mal', codigo: 1005, error: err });
});
exports.default = app;
//# sourceMappingURL=app.js.map