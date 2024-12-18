import { Injectable } from '@nestjs/common'
import type { IUserRepository } from 'src/application/repositories/user.repository.interface'
import { User } from 'src/application/models/User'
import { UserMapper } from '../../mappers/user/user.mapper'
import { PrismaService } from '../../prisma.service'

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
        verified: user.verified,
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
    name: string,
    tenantId: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        tenantId, // Aplica-se sempre
        OR: [
          {
            email,
          },
          {
            name,
          },
        ],
      },
    })

    console.log(user)

    return user ? UserMapper.toDomain(user) : null
  }

  async findByVerified(verified: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        verified,
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

  async getBalance(id: string): Promise<number> {
    const user = await this.prisma.user.findFirst({
      where: {
        userId: id,
      },
      select: {
        balance: true,
      },
    })

    return user.balance
  }

  async getRate(id: string): Promise<number> {
    const user = await this.prisma.user.findFirst({
      where: {
        userId: id,
      },
      select: {
        rate: true,
      },
    })

    return user.rate
  }
}
