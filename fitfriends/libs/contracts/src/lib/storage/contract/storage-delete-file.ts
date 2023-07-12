export namespace StorageDeleteFile {
  export const topic = 'storage.delete-file.event';

  export const queue = 'storage.delete-file';

  export class Request {
    fileName: string;
  }
  export class Response {}
}
