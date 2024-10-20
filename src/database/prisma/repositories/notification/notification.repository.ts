import { Injectable } from '@nestjs/common'
import { INotificationPreferencesRepository } from 'src/application/repositories/notification.preferences.repository.interface'
import { NotificationPreferences } from 'src/application/models/NotificationPreferences'
import { NotificationPreferencesMapper } from '../../mappers/notification/notification.mapper'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class NotificationPreferencesRepository
  implements INotificationPreferencesRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    notificationPreferences: NotificationPreferences,
  ): Promise<NotificationPreferences> {
    const toPersistence = NotificationPreferencesMapper.toPersistence(
      notificationPreferences,
    )

    const createdNotificationPreferences =
      await this.prismaService.notificationPreferences.create({
        data: toPersistence,
      })

    return NotificationPreferencesMapper.toDomain(
      createdNotificationPreferences,
    )
  }

  async update(
    id: string,
    notificationPreferences: NotificationPreferences,
  ): Promise<NotificationPreferences | null> {
    const toPersistence = NotificationPreferencesMapper.toPersistence(
      notificationPreferences,
    )

    const updatedNotificationPreferences =
      await this.prismaService.notificationPreferences.update({
        where: {
          preferencesId: id,
        },
        data: toPersistence,
      })

    return NotificationPreferencesMapper.toDomain(
      updatedNotificationPreferences,
    )
  }

  async delete(id: string): Promise<boolean> {
    const notificationPreferences =
      await this.prismaService.notificationPreferences.delete({
        where: {
          preferencesId: id,
        },
      })

    return !!notificationPreferences
  }

  async findById(id: string): Promise<NotificationPreferences | null> {
    const notificationPreferences =
      await this.prismaService.notificationPreferences.findUnique({
        where: {
          preferencesId: id,
        },
      })

    if (!notificationPreferences) {
      return null
    }

    return NotificationPreferencesMapper.toDomain(notificationPreferences)
  }

  async findByUserId(userId: string): Promise<NotificationPreferences | null> {
    const notificationPreferences =
      await this.prismaService.notificationPreferences.findFirst({
        where: {
          userId,
        },
      })

    if (!notificationPreferences) {
      return null
    }

    return NotificationPreferencesMapper.toDomain(notificationPreferences)
  }
}
