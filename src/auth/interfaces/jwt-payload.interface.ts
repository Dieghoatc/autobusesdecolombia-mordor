import { Role } from '../../users/enums/role.enum';

// 'upload': short-lived token that only works on endpoints marked @UploadTokenAllowed()
export type TokenScope = 'upload';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
  scope?: TokenScope;
}

// What JwtStrategy.validate() attaches to req.user
export interface AuthUser {
  user_id: number;
  email: string;
  role: Role;
  scope?: TokenScope;
}
