import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/repositories/user/user.repository'

@Injectable()
export class UserService {
  private readonly userRepository: UserRepository

  async findByEmailOrUsername(username: string, email: string) {
    return this.userRepository.findByEmailOrUsername(username, email)
  }
}
