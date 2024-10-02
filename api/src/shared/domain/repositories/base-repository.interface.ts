export interface IBaseRepository<E, Id> {
  findById(id: Id): Promise<E>;
  create(entity: E): Promise<E>;
  save(entity: E): Promise<E>;
  delete(id: Id): Promise<void>;
}
