import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../interfaces/jwt-payload.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser =>
    ctx.switchToHttp().getRequest().user,
);
