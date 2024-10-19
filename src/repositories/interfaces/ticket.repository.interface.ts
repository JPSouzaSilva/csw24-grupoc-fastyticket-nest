import { Prisma, Ticket } from '@prisma/client'

export abstract class ITicketRepository {
  abstract create(data: Prisma.TicketCreateInput): Promise<Ticket>
  abstract findByEventId(eventId: string): Promise<Ticket[]>
  abstract findById(id: string): Promise<Ticket>
  abstract update(id: string, data: Prisma.TicketUpdateInput): Promise<Ticket>
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
