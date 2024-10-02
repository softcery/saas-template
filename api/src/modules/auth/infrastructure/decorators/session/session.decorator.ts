import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const ReqSession = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  return request.session;
});
