import { Injectable } from '@nestjs/common'
import { ITicketRepository } from '../interfaces/ticket.repository.interface'
import { PrismaService } from 'src/services/prisma.service'
import { Prisma, Ticket } from '@prisma/client'

@Injectable()
export class TicketRepository implements ITicketRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByEventId(eventId: string): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: {
        eventId,
      },
    })
  }

  create(data: Prisma.TicketCreateInput): Promise<Ticket> {
    return this.prisma.ticket.create({ data })
  }

  findAll(page: number, limit: number): Promise<Ticket[]> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Ticket> {
    throw new Error('Method not implemented.')
  }

  update(data: Prisma.TicketUpdateInput): Promise<Ticket> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
