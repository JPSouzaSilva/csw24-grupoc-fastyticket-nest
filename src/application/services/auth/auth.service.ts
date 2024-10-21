import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { User } from 'src/application/models/User'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      username: user.name,
      email: user.email,
      id: user.id,
      role: user.role,
      tenantId: user.tenantId,
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
