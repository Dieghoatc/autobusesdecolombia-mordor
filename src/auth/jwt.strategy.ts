import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // extrae el JWT de cookies, headers, etc.
        (req) => {
          if (req && req.cookies) {
            return req.cookies['access_token'];
          }
          return null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(), // como fallback
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_JWT_KEY,
    });
  }

  async validate(payload: { email: string }) {
    // Este objeto se inserta en req.user automáticamente
    return { email: payload.email };
  }
}
