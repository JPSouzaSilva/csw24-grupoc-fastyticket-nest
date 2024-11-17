import type { Event } from 'src/application/models/Event'

export class EventView {
  static toResponse(event: Event) {
    return {
      id: event.id,
      name: event.name,
      type: event.type,
      location: event.location,
      tenantId: event.tenantId,
      ownerId: event.ownerId,
      dateAndTime: event.dateAndTime,
    }
  }
}
