import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from 'src/http/dtos/create.ticket.dto';
import { UserService } from '../user/user.service';
import { TicketRepository } from 'src/repositories/ticket/ticket.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class TicketService {
  constructor(private readonly userService: UserService, private readonly ticketRepository: TicketRepository) {}
  async create(createTicketDto: CreateTicketDto, req: any) {
    const user = await this.userService.findByEmailOrUsername(req.user.username, req.user.email)
    
    for (let i = 0; i < createTicketDto.numberOfTickets; i++) {
      const status = 'DISPONIVEL'
      const code = randomUUID()
      
      await this.ticketRepository.create({         
        price: createTicketDto.price,
        code,
        status,
        user: {
          connect: {id: user.id}
        },
        event: {
          connect: {id: createTicketDto.eventId}
        },
        tenant: {
          connect: {id: user.tenantId}
        } 
      })
    }
  }
}
