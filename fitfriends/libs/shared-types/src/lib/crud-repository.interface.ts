export interface CRUDRepository<E, I, R> {
  create(item: E): Promise<R>;
  findById(id: I): Promise<R | null>;
  update(id: I, item: E): Promise<R>;
  destroy(id: I): Promise<void>;
}
