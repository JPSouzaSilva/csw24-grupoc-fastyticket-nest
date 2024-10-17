import { Injectable } from '@nestjs/common'
import { IUserRepository } from '../interfaces/user.repository.interface'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { name: username }],
      },
    })
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } })
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      })
    } catch (error) {
      // Return null if the user doesn't exist
      return null
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id } })
      return true
    } catch (error) {
      // Return false if the user doesn't exist
      return false
    }
  }
}
