import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/repositories/user/user.repository'
import { AuthService } from '../auth/auth.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserService {
  private readonly userRepository: UserRepository
  private readonly authService: AuthService

  async findByEmailOrUsername(username: string, email: string) {
    return this.userRepository.findByEmailOrUsername(username, email)
  }

  async login(username: string, email: string) {
    return this.authService.login(username, email)
  }

  async register(data: Prisma.UserCreateInput) {
    return this.userRepository.create(data)
  }
}
