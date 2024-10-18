import { Prisma, Ticket } from '@prisma/client'

export abstract class ITicketRepository {
  abstract create(data: Prisma.TicketCreateInput): Promise<Ticket>
  abstract findByEventId(eventId: string): Promise<Ticket[]>
  abstract findById(id: string): Promise<Ticket>
  abstract update(data: Prisma.TicketUpdateInput): Promise<Ticket>
  abstract delete(id: string): Promise<boolean>
}
