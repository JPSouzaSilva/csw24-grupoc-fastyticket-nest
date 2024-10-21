import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'xanflis',
    })
  }

  async validate(payload: User) {
    return {
      username: payload.name,
      email: payload.email,
      id: payload.userId,
      role: payload.role,
      tenantId: payload.tenantId,
    }
  }
}
