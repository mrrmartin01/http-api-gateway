import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  roles: string[];
  ver: number;
  jti: string;
  typ: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const jwtFromRequestFn: JwtFromRequestFunction =
      ExtractJwt.fromAuthHeaderAsBearerToken();

    super({
      jwtFromRequest: jwtFromRequestFn,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY') || '',
      issuer: 'users-auth-service',
      audience: 'http-api-gateway',
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      address: payload?.address,
      roles: payload.roles,
      tokenVersion: payload.ver,
      jti: payload.jti,
    };
  }
}
