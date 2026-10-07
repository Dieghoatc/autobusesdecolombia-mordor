import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { Role } from '../../users/enums/role.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

// Requires a valid Bearer token; when roles are given, the user must have one of them.
export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth('access_token'),
    ApiUnauthorizedResponse({ description: 'Missing or invalid token' }),
    ...(roles.length ? [ApiForbiddenResponse({ description: 'Insufficient role' })] : []),
  );
}

export const AdminOnly = () => Auth(Role.Admin);
