import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as string,
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwtSecret') as string,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return { sub: payload.sub, username: payload.username };
  }
}
