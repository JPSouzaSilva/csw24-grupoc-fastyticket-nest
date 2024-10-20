import type { Ticket } from '../models/Ticket'

export abstract class ITicketRepository {
  abstract create(ticket: Ticket): Promise<Ticket>
  abstract findByEventId(eventId: string): Promise<Ticket[]>
  abstract findById(id: string): Promise<Ticket>
  abstract update(id: string, ticket: Ticket): Promise<Ticket>
  abstract delete(id: string): Promise<boolean>
  abstract findAllTicketAvailable(): Promise<Ticket[]>
  abstract findByCodeAndEventIdAndUserId(
    code: string,
    eventId: string,
    userId: string,
  ): Promise<Ticket>

  abstract findAvaiableByEventId(
    eventId: string,
    ticketId: string,
  ): Promise<Ticket>
}
