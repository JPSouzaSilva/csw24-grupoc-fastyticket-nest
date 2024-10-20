import { Injectable } from '@nestjs/common'
import type { IUserRepository } from 'src/application/repositories/user.repository.interface'
import type { PrismaService } from '../../prisma.service'
import { User } from 'src/application/models/User'
import { UserMapper } from '../../mappers/user/user.mapper'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User): Promise<User> {
    const userCreated = await this.prisma.user.create({
      data: {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId,
      },
    })
    return UserMapper.toDomain(userCreated)
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users.map((user) => UserMapper.toDomain(user))
  }

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { name: username }],
      },
    })

    return user ? UserMapper.toDomain(user) : null
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        userId: id,
      },
    })

    return user ? UserMapper.toDomain(user) : null
  }

  async update(id: string, user: User): Promise<User | null> {
    const userUpdated = await this.prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId,
      },
    })

    return userUpdated ? UserMapper.toDomain(userUpdated) : null
  }

  async delete(id: string): Promise<boolean> {
    const userDeleted = await this.prisma.user.delete({
      where: {
        userId: id,
      },
    })

    return !!userDeleted
  }
}
