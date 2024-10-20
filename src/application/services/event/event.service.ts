import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateEventDto } from 'src/http/dtos/event/create.event.dto'
import { UpdateEventDTO } from 'src/http/dtos/event/update.event.dto'
import { UserService } from '../user/user.service'
import type { IEventRepository } from 'src/application/repositories/event.repository.interface'
import { Event } from 'src/application/models/Event'

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly userService: UserService,
  ) {}

  async findAll(page: number, limit: number) {
    return this.eventRepository.findAll(page, limit)
  }

  async findById(id: string) {
    return this.eventRepository.findById(id)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(req: any, data: CreateEventDto) {
    if (!req.user) {
      throw new Error('User not found')
    }

    const user = await this.userService.findByEmailOrUsername(
      req.user.name,
      req.user.email,
    )

    if (!user) {
      throw new Error('User not found')
    }

    if (!user.tenantId) {
      throw new Error('User not authorized')
    }

    const { name, dateAndTime, location, type } = data

    const event = new Event({
      name,
      dateAndTime,
      location,
      tenantId: user.tenantId,
      type,
    })

    return this.eventRepository.create(event)
  }

  async update(id: string, data: UpdateEventDTO) {
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

  async delete(id: string) {
    const event = await this.eventRepository.findById(id)

    if (!event) {
      throw new NotFoundException('Event not found')
    }

    return await this.eventRepository.delete(id)
  }
}
