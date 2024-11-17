import type { Ticket } from 'src/application/models/Ticket'

export class TicketView {
  static toResponse(ticket: Ticket) {
    return {
      id: ticket.id,
      eventId: ticket.eventId,
      tenantId: ticket.tenantId,
      price: ticket.price,
      sellerId: ticket.sellerId,
      code: ticket.code,
      status: ticket.status,
      description: ticket.description ?? null,
    }
  }
}
