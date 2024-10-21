import { Injectable, NotFoundException } from '@nestjs/common'
import { NotificationPreferences } from 'src/application/models/NotificationPreferences'
import { INotificationPreferencesRepository } from 'src/application/repositories/notification.preferences.repository.interface'
import type { CreateNotificationDto } from 'src/http/dtos/notification/create.notification'

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: INotificationPreferencesRepository,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { receiveEmail, userId } = createNotificationDto

    const notification = new NotificationPreferences({
      receiveEmail,
      userId,
    })

    return this.notificationRepository.create(notification)
  }

  async findByUserId(userId: string) {
    return await this.notificationRepository.findByUserId(userId)
  }

  async preference(userId: string, receiveEmail: boolean) {
    const notification = await this.notificationRepository.findByUserId(userId)

    if (!notification) {
      throw new NotFoundException('Notification not found')
    }

    notification.receiveEmail = receiveEmail

    return this.notificationRepository.update(notification.id, notification)
  }
}
