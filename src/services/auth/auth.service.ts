import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      username: user.name,
      email: user.email,
      sub: user.id,
      role: user.role,
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
