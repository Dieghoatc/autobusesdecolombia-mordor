import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RolesGuard } from './roles.guard';
import { Role } from '../../users/enums/role.enum';

describe('RolesGuard', () => {
  const reflector = { getAllAndOverride: jest.fn() } as unknown as Reflector;
  const guard = new RolesGuard(reflector);

  const contextWithUser = (user?: { role: Role }) =>
    ({
      getHandler: () => null,
      getClass: () => null,
      switchToHttp: () => ({ getRequest: () => ({ user }) }),
    }) as unknown as ExecutionContext;

  const requireRoles = (roles?: Role[]) =>
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(roles);

  it('allows any authenticated user when no roles are required', () => {
    requireRoles(undefined);
    expect(guard.canActivate(contextWithUser({ role: Role.Editor }))).toBe(true);
  });

  it('allows a user with a required role', () => {
    requireRoles([Role.Admin]);
    expect(guard.canActivate(contextWithUser({ role: Role.Admin }))).toBe(true);
  });

  it('denies a user without a required role', () => {
    requireRoles([Role.Admin]);
    expect(guard.canActivate(contextWithUser({ role: Role.Editor }))).toBe(false);
  });

  it('denies when there is no user', () => {
    requireRoles([Role.Admin]);
    expect(guard.canActivate(contextWithUser(undefined))).toBe(false);
  });
});
