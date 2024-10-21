import { Injectable } from '@nestjs/common'
import type { ITicketRepository } from 'src/application/repositories/ticket.repository.interface'
import { Ticket } from 'src/application/models/Ticket'
import { TicketMapper } from '../../mappers/ticket/ticket.mapper'
import { PrismaService } from '../../prisma.service'

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

  async findByTransactionId(transactionId: string): Promise<Ticket[]> {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        transactionId,
      },
      include: {
        ticket: true,
      },
    })

    return transaction.map((transaction) =>
      TicketMapper.toDomain(transaction.ticket),
    )
  }

  async findAllBoughtByUser(
    userId: string,
  ): Promise<{ ticket: Ticket; transactionId: string }[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        buyerId: userId,
        transactionStatus: {
          not: 'Refunded',
        },
      },
      include: {
        ticket: true,
      },
    })

    return transactions.map((transaction) => ({
      ticket: TicketMapper.toDomain(transaction.ticket),
      transactionId: transaction.transactionId,
    }))
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
    const ticketUpdated = await this.prisma.ticket.update({
      where: {
        ticketId: id,
      },
      data: {
        event: {
          connect: {
            eventId: ticket.eventId,
          },
        },
        tenant: {
          connect: {
            tenantId: ticket.tenantId,
          },
        },
        seller: ticket.sellerId
          ? {
              connect: {
                userId: ticket.sellerId,
              },
            }
          : undefined,
        price: ticket.price,
        code: ticket.code,
        status: ticket.status,
        description: ticket.description,
      },
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

  async updateUserBalance(userId: string, value: number): Promise<void> {
    await this.prisma.user.update({
      where: {
        userId,
      },
      data: {
        balance: {
          increment: value,
        },
      },
    })
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
