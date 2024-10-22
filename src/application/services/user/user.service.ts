import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
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

  async findByVerified(verified: string) {
    return this.userRepository.findByVerified(verified)
  }

  async registerAdmin(data: RegisterUserDto, userRequest: User) {
    const { email, name, tenantId } = data

    if (userRequest.role !== 'SUPADMIN') {
      throw new UnauthorizedException('Unauthorized')
    }

    const verified = email.concat(name).concat(tenantId)

    const user = new User({
      email,
      name,
      role: 'ADMIN',
      tenantId,
      verified,
    })

    const notification = new NotificationPreferences({
      receiveEmail: false,
      userId: user.id,
    })

    if (
      await this.userRepository.findByEmailOrUsername(email, name, tenantId)
    ) {
      throw new BadRequestException('User already exists')
    }

    const createdUser = await this.userRepository.create(user)
    await this.notificationService.create(notification)

    return createdUser
  }

  async login(login: LoginDto) {
    if (!login.email || !login.username) {
      throw new BadRequestException('Invalid credentials')
    }

    const verified = login.email.concat(login.username).concat(login.tenantId)

    const user = await this.userRepository.findByVerified(verified)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return this.authService.login(user)
  }

  async register(data: RegisterUserDto) {
    const { email, name, tenantId } = data

    const verified = email.concat(name).concat(tenantId)

    const user = new User({
      email,
      name,
      role: 'USER',
      tenantId,
      verified,
    })

    const notification = new NotificationPreferences({
      receiveEmail: false,
      userId: user.id,
    })

    if (
      await this.userRepository.findByEmailOrUsername(email, name, tenantId)
    ) {
      throw new BadRequestException('User already exists')
    }

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
    const balance = await this.userRepository.getBalance(userId)

    return { balance }
  }
}
