export interface IDataAccessMapper<TEntity, TPersistence> {
  toPersistence(entity: TEntity): TPersistence;

  toDomain(persistence: TPersistence): TEntity;
}
