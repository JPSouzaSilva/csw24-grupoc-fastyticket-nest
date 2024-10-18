import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/repositories/user/user.repository'
import { AuthService } from '../auth/auth.service'
import { LoginDto } from 'src/http/dtos/login.user.dto'
import { RegisterUserDto } from 'src/http/dtos/register.user.dto'
import { log } from 'console'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly authService: AuthService) {}

  async findByEmailOrUsername(username: string, email: string) {
    return this.userRepository.findByEmailOrUsername(email, username)
  }

  async login(login: LoginDto) {
    const user = await this.findByEmailOrUsername(login.username, login.email)
    return this.authService.login(user)
  }

  async register(data: RegisterUserDto) {
    return this.userRepository.create(data)
  }
  
}
