import { Injectable } from '@nestjs/common'
import { IUserRepository } from '../interfaces/user.repository.interface'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaService

  async findByEmailOrUsername(email: string, username: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { name: username }],
      },
    })
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data })
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({ where: { id }, data })
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } }).then(() => true)
  }
}
