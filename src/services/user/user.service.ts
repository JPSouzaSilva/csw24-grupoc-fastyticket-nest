import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from 'src/repositories/user/user.repository'
import { AuthService } from '../auth/auth.service'
import { LoginDto } from 'src/http/dtos/login.user.dto'
import { RegisterUserDto } from 'src/http/dtos/register.user.dto'
import { Role, type User } from '@prisma/client'
import type { PreferencesDTO } from 'src/http/dtos/preferences.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async findByEmailOrUsername(username: string, email: string) {
    return this.userRepository.findByEmailOrUsername(email, username)
  }

  async login(login: LoginDto) {
    const user = await this.findByEmailOrUsername(login.username, login.email)
    return this.authService.login(user)
  }

  async register(data: RegisterUserDto) {
    const userCreateInput = {
      name: data.name,
      email: data.email,
      role: data.role === 'ADMIN' ? Role.ADMIN : Role.USER,
      tenant: {
        connect: {
          id: data.tenantId,
        },
      },
      NotificationPreferences: null,
      PrivacyConfig: null,
    }
    return this.userRepository.create(userCreateInput)
  }

  async preferences(preferenceDto: PreferencesDTO, user: User) {
    if (!user) {
      throw new NotFoundException('User not Found')
    }

    return await this.userRepository.update(user.id, {
      NotificationPreferences: {
        update: {
          pushNotification: preferenceDto.pushNotification,
          receiveEmail: preferenceDto.emailNotification,
        },
      },
    })
  }
}
