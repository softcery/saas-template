import { eq } from 'drizzle-orm';

import { IUserRepository } from '~modules/auth/application/repositories/user-repository.interface';
import { DrizzleRepository } from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema } from '~shared/infrastructure/database/schema';
import { authUsers } from '~shared/infrastructure/database/schema/auth-database-schema';

export class DrizzleUserRepository extends DrizzleRepository<MergedDbSchema> implements IUserRepository {
  public async findHashedPassword(id: string): Promise<string | null> {
    const result = await this.db.query.authUsers.findFirst({
      where: eq(authUsers.id, id),
      columns: {
        encryptedPassword: true,
      },
    });

    if (!result) return null;

    const { encryptedPassword = null } = result;

    return encryptedPassword;
  }
}
