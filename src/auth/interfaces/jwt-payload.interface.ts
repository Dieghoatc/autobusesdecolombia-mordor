import { Role } from '../../users/enums/role.enum';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}

// What JwtStrategy.validate() attaches to req.user
export interface AuthUser {
  user_id: number;
  email: string;
  role: Role;
}
