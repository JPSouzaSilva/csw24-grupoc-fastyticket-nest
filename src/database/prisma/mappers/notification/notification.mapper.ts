import type { NotificationPreferences as PrismaNotificationPreference } from '@prisma/client'
import { NotificationPreferences } from 'src/application/models/NotificationPreferences'

export class NotificationPreferencesMapper {
  static toDomain(
    notification: PrismaNotificationPreference,
  ): NotificationPreferences {
    return new NotificationPreferences(
      {
        userId: notification.userId,
        receiveEmail: notification.receiveEmails,
      },
      notification.preferencesId,
    )
  }

  static toPersistence(
    notification: NotificationPreferences,
  ): PrismaNotificationPreference {
    return {
      preferencesId: notification.id,
      userId: notification.userId,
      receiveEmails: notification.receiveEmail,
    }
  }
}
