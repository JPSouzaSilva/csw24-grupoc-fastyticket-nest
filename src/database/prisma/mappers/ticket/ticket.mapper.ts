import { Ticket as PrismaTicket } from '@prisma/client'
import { Ticket } from 'src/application/models/Ticket'

export class TicketMapper {
  static toDomain(ticket: PrismaTicket): Ticket {
    return new Ticket(
      {
        eventId: ticket.eventId,
        tenantId: ticket.tenantId,
        price: ticket.price,
        sellerId: ticket.sellerId,
        code: ticket.code,
        status: ticket.status,
        description: ticket.description,
      },
      ticket.ticketId,
    )
  }

  static toPersistence(ticket: Ticket): PrismaTicket {
    return {
      ticketId: ticket.id,
      eventId: ticket.eventId,
      tenantId: ticket.tenantId,
      price: ticket.price,
      sellerId: ticket.sellerId,
      code: ticket.code,
      status: ticket.status,
      description: ticket.description,
    }
  }
}
