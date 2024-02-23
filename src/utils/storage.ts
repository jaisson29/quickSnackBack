import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
	destination: function (req: Request, file: any, cb) {
		cb(null, 'uploads');
	},
	filename: function (req: Request, file: any, cb) {
		// const ext = file.originalname.split('.').pop();
		file.originalname.split('.').pop();
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1000000,
	},
	fileFilter: (req: Request, file: any, cb) => {
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
			cb(null, true);
		} else {
			cb(new Error('Solo se permiten imágenes JPEG y PNG'));
		}
	},
});

export { upload };
