import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/repositories/user/user.repository'
import { AuthService } from '../auth/auth.service'
import { Prisma } from '@prisma/client'
import { LoginDto } from 'src/http/dtos/Login.dto'

@Injectable()
export class UserService {
  private readonly userRepository: UserRepository
  private readonly authService: AuthService

  async findByEmailOrUsername(username: string, email: string) {
    return this.userRepository.findByEmailOrUsername(username, email)
  }

  async login(login: LoginDto) {
    const user = await this.findByEmailOrUsername(login.email, login.username)
    return this.authService.login(user)
  }

  async register(data: Prisma.UserCreateInput) {
    return this.userRepository.create(data)
  }
}
