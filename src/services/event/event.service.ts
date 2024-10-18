import { Injectable } from '@nestjs/common';
import { CreateEventDto } from 'src/http/dtos/create.event.dto';
import { UpdateEventDTO } from 'src/http/dtos/update.event.dto';
import { EventRepository } from 'src/repositories/event/event.repository';
import { UserService } from '../user/user.service';
import { log } from 'console';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository, private readonly userService: UserService) {}

  async findAll(page: number, limit: number) {
    return this.eventRepository.findAll(page, limit);
  }

  async findById(id: string) {
    return this.eventRepository.findById(id);
  }

  async create(req: any, data: CreateEventDto) {
    log(req.user);
    if (!req.user) {
      throw new Error('User not found');
    }

    const user = await this.userService.findByEmailOrUsername(req.user.name, req.user.email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.role !== 'ADMIN' || !user.tenantId) {
      throw new Error('User not authorized');
    }
    
    return this.eventRepository.create(data, user.tenantId);
  }

  async update(data: UpdateEventDTO) {
    return this.eventRepository.update(data);
  }

  async delete(id: string) {
    return this.eventRepository.delete(id);
  }
}
