import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateEventDto } from 'src/http/dtos/event/create.event.dto'
import { UpdateEventDTO } from 'src/http/dtos/event/update.event.dto'
import { Event } from 'src/application/models/Event'
import { User } from 'src/application/models/User'
import { IEventRepository } from 'src/application/repositories/event.repository.interface'

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: IEventRepository) {}

  async findAll(page: number, limit: number, tenantId: string) {
    return await this.eventRepository.findAll(page, limit, tenantId)
  }

  async findById(id: string) {
    return this.eventRepository.findById(id)
  }

  async create(data: CreateEventDto, userToRequest: User) {
    if (userToRequest.role !== 'ADMIN') {
      throw new ForbiddenException(
        'You do not have permission to create an event',
      )
    }
    const { name, dateAndTime, location, type } = data

    const event = new Event({
      name,
      dateAndTime,
      location,
      tenantId: userToRequest.tenantId,
      type,
      ownerId: userToRequest.id,
    })

    return this.eventRepository.create(event)
  }

  async update(id: string, data: UpdateEventDTO, userToRequest: User) {
    const ownerId = await this.getOwnerId(id)

    if (userToRequest.id !== ownerId) {
      throw new UnauthorizedException(
        'You do not have permission to update this event',
      )
    }

    if (userToRequest.role !== 'ADMIN') {
      throw new ForbiddenException(
        'You do not have permission to create an event',
      )
    }

    const { name, type, location, dateAndTime } = data

    const event = await this.eventRepository.findById(id)

    if (!event) {
      throw new NotFoundException('Event not found')
    }

    event.name = name ?? event.name
    event.type = type ?? event.type
    event.location = location ?? event.location
    event.dateAndTime = dateAndTime ?? event.dateAndTime

    return await this.eventRepository.update(id, event)
  }

  async delete(id: string, userToRequest: User) {
    const ownerId = await this.getOwnerId(id)

    if (userToRequest.id !== ownerId) {
      throw new UnauthorizedException(
        'You do not have permission to update this event',
      )
    }

    if (userToRequest.role !== 'ADMIN') {
      throw new ForbiddenException(
        'You do not have permission to create an event',
      )
    }

    const event = await this.eventRepository.findById(id)

    if (!event) {
      throw new NotFoundException('Event not found')
    }

    return await this.eventRepository.delete(id)
  }

  async getOwnerId(id: string) {
    const event = await this.eventRepository.findById(id)

    return event.ownerId
  }
}
