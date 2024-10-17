import { Injectable } from '@nestjs/common';
import { CreateEventDto } from 'src/http/dtos/create.event.dto';
import { EventRepository } from 'src/repositories/event/event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async findAll(page: number, limit: number) {
    return this.eventRepository.findAll(page, limit);
  }

  async findById(id: string) {
    return this.eventRepository.findById(id);
  }

  async create(data: CreateEventDto) {
    return this.eventRepository.create(data);
  }

  async update(id: string, data: any) {
    return this.eventRepository.update(id, data);
  }

  async delete(id: string) {
    return this.eventRepository.delete(id);
  }
}
