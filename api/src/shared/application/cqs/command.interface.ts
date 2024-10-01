import { Inject } from '@nestjs/common';

import { BaseToken } from '~shared/constants';

import { IDbContext } from '../services/db-context.interface';

export abstract class Command<TInput = void, TOutput = void> {
  protected _input: TInput;

  @Inject(BaseToken.DB_CONTEXT)
  protected _dbContext: IDbContext;

  async execute(input: TInput): Promise<TOutput> {
    this._input = input;

    await this._dbContext.startTransaction();

    let result: TOutput;

    try {
      result = await this.implementation();

      await this._dbContext.commitTransaction();
    } catch (error) {
      await this._dbContext.rollbackTransaction();

      throw error;
    }

    return result;
  }

  protected abstract implementation(): Promise<TOutput> | TOutput;
}
