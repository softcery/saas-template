import { Inject } from '@nestjs/common';

import { BaseToken } from '~shared/constants';

import { IEventDispatcher } from '../events/event-dispatcher/event-dispatcher.interface';
import { IDbContext } from '../services/db-context.interface';

export abstract class UseCase<TInput = void, TOutput = void> {
  protected _input: TInput;

  @Inject(BaseToken.EVENT_DISPATCHER)
  protected _eventDispatcher: IEventDispatcher;

  @Inject(BaseToken.DB_CONTEXT)
  protected _dbContext: IDbContext;

  async execute(input: TInput): Promise<TOutput> {
    this._input = input;
    return this.implementation();
  }

  protected abstract implementation(): Promise<TOutput> | TOutput;
}
