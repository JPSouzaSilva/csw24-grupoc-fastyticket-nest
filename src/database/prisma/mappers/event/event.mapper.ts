import type { Event as PrismaEvent } from '@prisma/client'
import { Event } from 'src/application/models/Event'

export class EventMapper {
  static toDomain(event: PrismaEvent): Event {
    return new Event(
      {
        name: event.eventName,
        dateAndTime: event.dateTime,
        location: event.location,
        tenantId: event.tenantId,
        type: event.type,
        ownerId: event.onwerId,
      },
      event.eventId,
    )
  }

  static toPersistence(event: Event): PrismaEvent {
    return {
      eventId: event.id,
      eventName: event.name,
      dateTime: event.dateAndTime,
      location: event.location,
      tenantId: event.tenantId,
      type: event.type,
      onwerId: event.ownerId,
    }
  }
}
