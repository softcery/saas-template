export abstract class UseCase<TInput = void, TOutput = void> {
  protected _input: TInput;

  async execute(input: TInput): Promise<TOutput> {
    this._input = input;
    return this.implementation();
  }

  protected abstract implementation(): Promise<TOutput> | TOutput;
}
