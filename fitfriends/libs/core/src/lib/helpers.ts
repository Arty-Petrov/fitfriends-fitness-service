import { HttpException, HttpStatus } from '@nestjs/common';
import dayjs from 'dayjs';
import { ensureDir } from 'fs-extra';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadField } from './constants/upload-field.const';

export function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function createMulterOptions(maxFileSize: number, fileType: RegExp, maxCount = 1) {
  return {
    limits: {
      fileSize: maxFileSize,
      files: maxCount,
    },
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(fileType)) {
        cb(null, true);
      } else {
        cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
      }
    },
    storage: diskStorage({
      destination: async (req: any, file: Express.Multer.File, cb: any) => {
        const rootDir = process.env.MULTER_DEST;

        const { user, url, id } = req;

        const categoryDir = Object.values(UploadField).find((path) => url.includes(path));
        if (!categoryDir) {
          throw new HttpException('Unexpecxted field name', HttpStatus.BAD_REQUEST);
        }

        const userId = user.id;
        const routeId = id ? `-${id}` : '';

        const timestamp = `-${dayjs().unix()}`;
        const uploadDir = `${rootDir}/${categoryDir}/${userId}${routeId}${timestamp}`;
        await ensureDir(uploadDir);
        cb(null, uploadDir);
      },
      filename: (req: any, file: any, cb: any) => {
        cb(null, `${file.originalname}`);
      },
    }),
  };
}
