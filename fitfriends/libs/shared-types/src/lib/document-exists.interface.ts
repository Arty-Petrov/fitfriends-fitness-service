export interface DocumentExists {
  exists(documentId: string | number): Promise<boolean>;
}
