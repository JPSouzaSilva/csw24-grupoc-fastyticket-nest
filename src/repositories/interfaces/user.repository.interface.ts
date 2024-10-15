import { Prisma, User } from '@prisma/client'

export interface IUserRepository {
  create(data: Prisma.UserCreateInput): Promise<User | null>
  findAll(): Promise<User[]>
  findByEmailOrUsername(email: string, username: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  update(id: string, data: Prisma.UserUpdateInput): Promise<User | null>
  delete(id: string): Promise<boolean>
}
