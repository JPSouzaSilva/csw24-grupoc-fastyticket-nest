import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    username: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmailOrUsername(username, email)

    if (!user) {
      throw new Error('User not found')
    }

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
