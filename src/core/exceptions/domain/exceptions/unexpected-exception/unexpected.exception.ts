import { ServerException } from '../server-exception/server.exception';

export class UnexpectedException extends ServerException {
  constructor(error: unknown) {
    super('UNEXPECTED', 'Unexpected server exception', error);
  }
}
