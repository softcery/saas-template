import { InferSelectModel, Table, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { IDataAccessMapper } from '~shared/domain/mappers/data-access-mapper.interface';
import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

import { MergedDbSchema } from '../../schema';

export class TableDefinition<
  T extends Table<any> = Table<any>,
  K extends keyof InferSelectModel<T> = keyof InferSelectModel<T>,
> {
  constructor(
    public table: T,
    public idKey: K,
  ) {}

  public static create<T extends Table<any>, K extends keyof InferSelectModel<T> = keyof InferSelectModel<T>>(
    table: T,
    idKey: K,
  ) {
    return new TableDefinition(table, idKey);
  }
}

export abstract class DrizzleRepository<
  TEntity,
  Td extends TableDefinition<any>,
  TPersistence extends InferSelectModel<Td['table']> = InferSelectModel<Td['table']>,
  S extends Record<string, unknown> = MergedDbSchema,
  Id extends InferSelectModel<Td['table']>[Td['idKey']] = InferSelectModel<Td['table']>[Td['idKey']],
> implements IBaseRepository<TEntity, Id>
{
  constructor(
    private readonly tableDefinition: Td,
    protected readonly db: NodePgDatabase<S>,
    protected readonly mapper: IDataAccessMapper<TEntity, TPersistence>,
  ) {}

  public async findById(id: Id): Promise<TEntity> {
    const [result] = await this.db
      .select()
      .from(this.tableDefinition.table)
      .where(eq(this.tableDefinition.table[this.tableDefinition.idKey], id))
      .limit(1);
    if (!result) return null;
    this.mapper.toDomain(result as any);
  }
  public async create(entity: TEntity): Promise<TEntity> {
    const [result] = (await this.db
      .insert(this.tableDefinition.table)
      .values(this.mapper.toPersistence(entity))
      .returning()) as any[];
    if (!result) return null;
    this.mapper.toDomain(result as any);
  }
  public async save(entity: TEntity): Promise<TEntity> {
    const [result] = (await this.db
      .insert(this.tableDefinition.table)
      .values(this.mapper.toPersistence(entity))
      .onConflictDoUpdate({ target: [this.tableDefinition.table[this.tableDefinition.idKey]], set: entity })
      .returning()) as any[];
    if (!result) return null;
    this.mapper.toDomain(result as any);
  }

  public async delete(id: Id): Promise<void> {
    await this.db
      .delete(this.tableDefinition.table)
      .where(eq(this.tableDefinition.table[this.tableDefinition.idKey], id));
  }
}
