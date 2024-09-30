export interface IUserRepository {
  findHashedPassword(id: string): Promise<string | null>;
}
