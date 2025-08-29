/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secretOrKey = process.env.JWT_SECRET;
    if (!secretOrKey) {
      throw new Error('JWT_PUBLIC_KEY or JWT_SECRET must be defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
    });
  }

  validate(payload: { sub: number; email: string; role: string[] }) {
    return { userId: payload.sub, email: payload.email, roles: payload.role };
  }
}
