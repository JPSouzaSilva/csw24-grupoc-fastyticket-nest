import { Injectable } from '@nestjs/common'
import { ITicketRepository } from '../interfaces/ticket.repository.interface'
import { PrismaService } from 'src/services/prisma.service'
import { Prisma, Ticket } from '@prisma/client'

@Injectable()
export class TicketRepository implements ITicketRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByCodeAndEventIdAndUserId(
    code: string,
    eventId: string,
    userId: string,
  ): Promise<Ticket> {
    return await this.prisma.ticket.findFirst({
      where: {
        code,
        eventId,
        userId,
      },
    })
  }

  findAllTicketAvailable(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: {
        status: 'DISPONIVEL',
      },
    })
  }

  findByEventId(eventId: string): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: {
        eventId,
      },
    })
  }

  findAvaiableByEventId(eventId: string): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: {
        eventId,
        status: 'DISPONIVEL',
      },
    })
  }

  create(data: Prisma.TicketCreateInput): Promise<Ticket> {
    return this.prisma.ticket.create({ data })
  }

  findById(id: string): Promise<Ticket> {
    return this.prisma.ticket.findUnique({ where: { id } })
  }

  update(id: string, data: Prisma.TicketUpdateInput): Promise<Ticket> {
    return this.prisma.ticket.update({ where: { id }, data })
  }

  delete(id: string): Promise<boolean> {
    return this.prisma.ticket.delete({ where: { id } }).then(() => true)
  }
}
