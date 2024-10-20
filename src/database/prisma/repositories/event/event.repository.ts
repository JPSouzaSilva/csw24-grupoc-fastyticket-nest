import { Injectable } from '@nestjs/common'
import type { IEventRepository } from 'src/application/repositories/event.repository.interface'
import type { Event } from 'src/application/models/Event'
import type { PaginatedEventsDto } from 'src/http/dtos/paginated.event.dto'
import { EventMapper } from '../../mappers/event/event.mapper'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(event: Event): Promise<Event> {
    const toPersistence = EventMapper.toPersistence(event)

    const createdEvent = await this.prisma.event.create({
      data: toPersistence,
    })

    return EventMapper.toDomain(createdEvent)
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedEventsDto<Event>> {
    const events = await this.prisma.event.findMany({
      skip: page * limit,
      take: limit,
    })

    return {
      data: events.map((event) => EventMapper.toDomain(event)),
      page,
      lastPage: Math.ceil(events.length / limit),
      total: events.length,
    }
  }

  async findById(id: string): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: {
        eventId: id,
      },
    })

    if (!event) {
      return null
    }

    return EventMapper.toDomain(event)
  }

  async update(id: string, event: Event): Promise<Event | null> {
    const toPersistence = EventMapper.toPersistence(event)

    const updatedEvent = await this.prisma.event.update({
      where: {
        eventId: id,
      },
      data: toPersistence,
    })

    return EventMapper.toDomain(updatedEvent)
  }

  async delete(id: string): Promise<boolean> {
    const event = await this.prisma.event.delete({
      where: {
        eventId: id,
      },
    })

    return !!event
  }
}
