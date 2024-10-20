import { Injectable } from '@nestjs/common'
import type { ITicketRepository } from 'src/application/repositories/ticket.repository.interface'
import type { PrismaService } from '../../prisma.service'
import { Ticket } from 'src/application/models/Ticket'
import { TicketMapper } from '../../mappers/ticket/ticket.mapper'

@Injectable()
export class TicketRepository implements ITicketRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(ticket: Ticket): Promise<Ticket> {
    const toCreate = TicketMapper.toPersistence(ticket)

    const ticketCreated = await this.prisma.ticket.create({
      data: toCreate,
    })

    return TicketMapper.toDomain(ticketCreated)
  }

  async findByEventId(eventId: string): Promise<Ticket[]> {
    const tickets = await this.prisma.ticket.findMany({
      where: {
        eventId,
      },
    })

    return tickets.map((ticket) => TicketMapper.toDomain(ticket))
  }

  async findById(id: string): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        ticketId: id,
      },
    })

    return TicketMapper.toDomain(ticket)
  }

  async update(id: string, ticket: Ticket): Promise<Ticket> {
    const toPersistence = TicketMapper.toPersistence(ticket)

    const ticketUpdated = await this.prisma.ticket.update({
      where: {
        ticketId: id,
      },
      data: toPersistence,
    })

    return TicketMapper.toDomain(ticketUpdated)
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.prisma.ticket.delete({
      where: {
        ticketId: id,
      },
    })

    return !!deleted
  }

  async findAllTicketAvailable(): Promise<Ticket[]> {
    const tickets = await this.prisma.ticket.findMany({
      where: {
        status: 'Disponivel',
      },
    })

    return tickets.map((ticket) => TicketMapper.toDomain(ticket))
  }

  async findByCodeAndEventIdAndUserId(
    code: string,
    eventId: string,
    userId: string,
  ): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        code,
        eventId,
        sellerId: userId,
      },
    })

    return TicketMapper.toDomain(ticket)
  }

  async findAvaiableByEventId(
    eventId: string,
    ticketId: string,
  ): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        eventId,
        ticketId,
        status: 'Disponivel',
      },
    })

    return TicketMapper.toDomain(ticket)
  }
}
