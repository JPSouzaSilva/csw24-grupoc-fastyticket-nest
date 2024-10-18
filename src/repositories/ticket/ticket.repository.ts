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

  findById(id: string): Promise<Ticket> {
    return this.prisma.ticket.findUnique({ where: { id } })
  }

  update(data: Prisma.TicketUpdateInput): Promise<Ticket> {
    const id = data.id.toString()
    return this.prisma.ticket.update({ where: { id }, data })
  }

  delete(id: string): Promise<boolean> {
    return this.prisma.ticket.delete({ where: { id } }).then(() => true)
  }
}
