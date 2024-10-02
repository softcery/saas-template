export interface IUseCase<TInput = void, TOutput = void> {
  execute(input: TInput): Promise<TOutput>;
}
