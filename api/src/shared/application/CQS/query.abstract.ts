import { Inject } from '@nestjs/common';

import { BaseToken } from '~shared/constants';

import { IDbContext } from '../services/db-context.interface';
import { IUseCase } from '../use-cases/use-case.interface';

export abstract class Query<TInput, TOutput> implements IUseCase<TInput, TOutput> {
  protected _input: TInput;

  @Inject(BaseToken.DB_CONTEXT)
  protected _dbContext: IDbContext;

  async execute(input: TInput): Promise<TOutput> {
    this._input = input;

    const result: TOutput = await this.implementation();

    return result;
  }

  protected abstract implementation(): Promise<TOutput> | TOutput;
}
