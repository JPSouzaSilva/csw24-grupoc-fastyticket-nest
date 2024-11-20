import type { NotificationPreferences } from 'src/application/models/NotificationPreferences'

export class NotificationPreferencesView {
  static toResponse(notificationPreferences: NotificationPreferences) {
    return {
      id: notificationPreferences.id,
      userId: notificationPreferences.userId,
      receiveEmail: notificationPreferences.receiveEmail,
    }
  }
}
