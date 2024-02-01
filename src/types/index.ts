export interface Proveedor {
	provId?: number;
	provNom?: string;
	provNit?: number;
}

export interface Usuario {
	usuId?: number;
	usuTipoDoc?: number;
	usuNoDoc?: string;
	usuGen?: number;
	usuNom?: string;
	usuEmail?: string;
	usuCOntra?: string;
	usuIngreso?: Date;
	usuImg?: string;
	perfilId?: number;
	usuKey?: string;
	usuOlvid?: Date;
}

