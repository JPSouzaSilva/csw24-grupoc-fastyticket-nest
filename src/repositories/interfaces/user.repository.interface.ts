import { Prisma, User } from '@prisma/client'
import { RegisterUserDto } from 'src/http/dtos/register.user.dto';

export abstract class IUserRepository {
  abstract create(data: RegisterUserDto): Promise<User | null>
  abstract findAll(): Promise<User[]>
  abstract findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null>

  abstract findById(id: string): Promise<User | null>
  abstract update(
    id: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User | null>

  abstract delete(id: string): Promise<boolean>
}
