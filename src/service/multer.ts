import { Request } from 'express';
import multer from 'multer';
import path from 'path';

const uploadFile = multer({
  storage: multer.diskStorage({
    filename(_: Request, file: any, cb: CallableFunction) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
      );
    },
  }),
}).single('image');

export default uploadFile;
