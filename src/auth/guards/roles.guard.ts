import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '../../users/enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UPLOAD_TOKEN_ALLOWED_KEY } from '../decorators/upload-token.decorator';
import { AuthUser } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const targets = [context.getHandler(), context.getClass()];
    const user: AuthUser | undefined = context.switchToHttp().getRequest().user;

    // Upload tokens only work where explicitly allowed
    if (
      user?.scope === 'upload' &&
      !this.reflector.getAllAndOverride<boolean>(UPLOAD_TOKEN_ALLOWED_KEY, targets)
    ) {
      return false;
    }

    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, targets);
    if (!roles?.length) return true;

    return !!user && roles.includes(user.role);
  }
}
