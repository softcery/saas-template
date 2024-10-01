export abstract class Entity<TId = unknown> {
  public readonly id: TId;

  public equals(entity: Entity): boolean {
    return this.id === entity.id;
  }
}
