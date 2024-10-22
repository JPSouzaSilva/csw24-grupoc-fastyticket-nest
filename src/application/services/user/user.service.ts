import { Injectable, NotFoundException } from '@nestjs/common'
import { NotificationPreferences } from 'src/application/models/NotificationPreferences'
import { User } from 'src/application/models/User'
import { IUserRepository } from 'src/application/repositories/user.repository.interface'
import { LoginDto } from 'src/http/dtos/login.user.dto'
import { RegisterUserDto } from 'src/http/dtos/user/register.user.dto'
import { AuthService } from '../auth/auth.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
  ) {}

  async findByEmailOrUsername(username: string, email: string) {
    return this.userRepository.findByEmailOrUsername(email, username)
  }

  async login(login: LoginDto) {
    const user = await this.userRepository.findByEmailOrUsername(
      login.email,
      login.username,
    )

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return this.authService.login(user)
  }

  async register(data: RegisterUserDto) {
    const { email, name, role, tenantId } = data

    const user = new User({
      email,
      name,
      role,
      tenantId,
    })

    const notification = new NotificationPreferences({
      receiveEmail: false,
      userId: user.id,
    })

    const createdUser = await this.userRepository.create(user)
    await this.notificationService.create(notification)

    return createdUser
  }

  async getRate(userId: string) {
    return this.userRepository.getRate(userId)
  }

  async findById(userId: string) {
    return await this.userRepository.findById(userId)
  }

  async getBalance(userId: string) {
    return this.userRepository.getBalance(userId)
  }
}
