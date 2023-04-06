export namespace StorageDeleteFile {
  export const topic = 'storage.delete-file.event';

  export class Request {
    fileName: string;
  }
  export class Response {}
}
