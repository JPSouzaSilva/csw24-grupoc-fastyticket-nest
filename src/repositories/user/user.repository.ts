import { Injectable } from '@nestjs/common'
import { IUserRepository } from '../interfaces/user.repository.interface'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'
import { RegisterUserDto } from 'src/http/dtos/register.user.dto'
import { log } from 'console'

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

  async create(data: RegisterUserDto): Promise<User> {
    log(data)
    const {
      tenantId,
      notificationPreferencesId,
      privacyConfigId,
      ...userData
    } = data

    return this.prisma.user.create({
      data: {
        ...userData, // Inclui os campos obrigatórios (name, email, role)
        ...(tenantId && {
          Tenant: {
            connect: {
              id: tenantId, // Se o tenantId for fornecido, conecta ao Tenant
            },
          },
        }),
        ...(notificationPreferencesId && {
          NotificationPreferences: {
            connect: {
              id: notificationPreferencesId, // Se notificationPreferencesId for fornecido, conecta a NotificationPreferences
            },
          },
        }),
        ...(privacyConfigId && {
          PrivacyConfig: {
            connect: {
              id: privacyConfigId, // Se privacyConfigId for fornecido, conecta a PrivacyConfig
            },
          },
        }),
      },
    })
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
