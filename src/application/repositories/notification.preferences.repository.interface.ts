import type { NotificationPreferences } from '../models/NotificationPreferences'

export abstract class INotificationPreferencesRepository {
  abstract create(
    notificationPreferences: NotificationPreferences,
  ): Promise<NotificationPreferences>

  abstract update(
    id: string,
    notificationPreferences: NotificationPreferences,
  ): Promise<NotificationPreferences | null>

  abstract delete(id: string): Promise<boolean>
  abstract findById(id: string): Promise<NotificationPreferences | null>
  abstract findByUserId(userId: string): Promise<NotificationPreferences | null>
}
