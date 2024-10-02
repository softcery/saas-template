import { ExceptionType } from '../../mappers/app-exception/exception-type';

export abstract class AppException {
  public abstract readonly type: ExceptionType;

  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly originalError: unknown | null = null,
  ) {}

  toString(): string {
    return `${this.type} : ${this.message}`;
  }
}
