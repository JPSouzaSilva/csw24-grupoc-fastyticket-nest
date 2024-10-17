import { Prisma, User } from '@prisma/client'

export abstract class IUserRepository {
  abstract create(data: Prisma.UserCreateInput): Promise<User | null>
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
