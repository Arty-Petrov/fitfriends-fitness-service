import { HttpException, HttpStatus } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import { ensureDir } from 'fs-extra';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadField } from './constants/upload-field.const';

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getRabbitConnectionString({
  username,
  password,
  host,
  port,
}): string {
  return `amqp://${username}:${password}@${host}:${port}`;
}
export function fillObject<T, V>(
  dto: ClassConstructor<T>,
  plainObject: V,
  groups: string[] = []
) {
  const options = !groups.length
    ? { excludeExtraneousValues: true }
    : { excludeExtraneousValues: true, groups: [...groups] };
  return plainToInstance(dto, plainObject, { ...options });
}
export function precisionRound(num: number, decimals = 0): number {
  let factor = 1;
  if (decimals) {
    factor *= 10;
    factor **= decimals;
  }
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

export function createMulterOptions(
  maxFileSize: number,
  fileType: RegExp,
  maxCount = 1
) {
  return {
    limits: {
      fileSize: maxFileSize,
      files: maxCount,
    },
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
      if (file.mimetype.match(fileType)) {
        cb(null, true);
      } else {
        cb(
          new HttpException(
            `Unsupported file type ${extname(file.originalname)}`,
            HttpStatus.BAD_REQUEST
          ),
          false
        );
      }
    },
    storage: diskStorage({
      async destination(req: any, file: Express.Multer.File, cb: any) {
        const rootDir = process.env.MULTER_DEST;

        const { id } = req;
        const categoryDir = Object.values(UploadField).find(
          (field) => file.fieldname === field
        );
        if (!categoryDir) {
          throw new HttpException(
            'Unexpected field name',
            HttpStatus.BAD_REQUEST
          );
        }
        const routeId = id ? `${id}-` : '';

        const timestamp = `${dayjs().unix()}`;
        const uploadDir = `${rootDir}/${categoryDir}/${routeId}${timestamp}`;
        await ensureDir(uploadDir);
        cb(null, uploadDir);
      },
      filename: (req: any, file: Express.Multer.File, cb: any) => {
        cb(null, `${file.originalname}`);
      },
    }),
  };
}
