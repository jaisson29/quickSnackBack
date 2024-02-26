export interface SendError {
	message: string;
	error: string;
}

export interface MysqlError extends Error {
	errno: number;
	code: string;
	fatal: boolean;
}

export interface Proveedor {
	provId?: number;
	provNom?: string;
	provNit?: number;
}

export interface Producto {
	prodId?: number;
	catId?: number;
	prodNom?: string;
	prodDescr?: string;
	prodImg?: string;
	prodValCom?: number;
	prodValVen?: number;
	prodEst?: number;
}

export interface Categoria {
	catId?: number;
	catNom?: string;
}

export interface Compra {
	compraId?: number;
	provId?: number;
	fechaCompra?: Date;
}

export interface DetCompra {
	detCompraId: number;
	prodId: number;
	compraId: number;
	deCompraCant: number;
}

export interface Transaccion {
	transacId?: number;
	transacFecha?: Date;
	usuId?: number;
	transacTipo?: number;
	transacEst?: number;
}

export interface DetVenta {
	detVentaId?: number;
	prodId?: number;
	transacId?: number;
	detVentaCant?: number;
}
export interface Dominio {
	domId?: number;
	domNom?: string;
}

export interface Valor {
	valorId?: number;
	param?: string;
	domId?: number;
}

export interface Pagina {
	paginaId?: number | String;
	paginaNom?: string;
	paginaIcon?: string;
	paginaRuta?: string;
}

export interface Perfil {
	perfilId?: number | String;
	perfilNom?: string;
	paginaRuta?: string;
}

export interface PerXPag {
	paginaId?: number;
	perfilId?: number;
}
export interface Usuario {
	usuId?: number;
	usuTipoDoc?: number;
	usuNoDoc?: string;
	usuGen?: number;
	usuNom?: string;
	usuEmail?: string;
	usuContra?: string;
	usuIngreso?: Date;
	usuImg?: string;
	perfilId?: number;
	usuKey?: string;
	usuOlvid?: Date;
	usuEst?: number;
}

