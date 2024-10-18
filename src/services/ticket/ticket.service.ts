import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTicketDto } from 'src/http/dtos/create.ticket.dto'
import { UserService } from '../user/user.service'
import { TicketRepository } from 'src/repositories/ticket/ticket.repository'
import { randomUUID } from 'crypto'
import type { TicketBuyDto } from 'src/http/dtos/ticketBuy.dto'
import { Status } from 'src/lib/status.enum'
import type { User } from '@prisma/client'
import type { SellTicketDto } from 'src/http/dtos/sell.ticket.dto'
import type { AuthenticTicketDto } from 'src/http/dtos/authentic.ticket.dto'

@Injectable()
export class TicketService {
  constructor(
    private readonly userService: UserService,
    private readonly ticketRepository: TicketRepository,
  ) {}

  async findByEventId(id: string) {
    return this.ticketRepository.findByEventId(id)
  }

  async findAllTicketAvailable() {
    return this.ticketRepository.findAllTicketAvailable()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(createTicketDto: CreateTicketDto, req: any) {
    const user = await this.userService.findByEmailOrUsername(
      req.user.username,
      req.user.email,
    )
    const tickets = {}
    for (let i = 0; i < createTicketDto.numberOfTickets; i++) {
      const status = Status.Disponivel
      const code = randomUUID()

      tickets[i] = await this.ticketRepository.create({
        price: createTicketDto.price,
        code,
        status,
        user: {
          connect: { id: user.id },
        },
        event: {
          connect: { id: createTicketDto.eventId },
        },
        tenant: {
          connect: { id: user.tenantId },
        },
      })
    }
    return tickets
  }

  async buyTicket(buyTicketDTO: TicketBuyDto, user: User) {
    if (!user) {
      throw new NotFoundException('User not Found')
    }

    const { eventId, tickets } = buyTicketDTO

    const haveEvent = this.findByEventId(eventId)

    if (!haveEvent) {
      throw new NotFoundException('Event not Found')
    }

    const allTicketsAvailable = await this.findAllTicketAvailable()

    const ticketsAvailable = allTicketsAvailable.filter(
      (ticket) =>
        ticket.eventId === eventId &&
        ticket.status === Status.Disponivel &&
        tickets.includes(ticket.id),
    )

    if (ticketsAvailable.length < tickets.length) {
      throw new NotFoundException('Tickets not available')
    }

    const ticketsBought = []
    for (let i = 0; i < tickets.length; i++) {
      const ticket = ticketsAvailable[i]
      ticketsBought.push(
        await this.ticketRepository.update(ticket.id, {
          status: Status.Aceito,
          user: {
            connect: { id: user.id },
          },
          // TODO: PAYMENT AND NOTIFICATION
        }),
      )
    }

    return ticketsBought
  }

  async sellTicket(sellTicketDto: SellTicketDto, user: User) {
    if (!user) {
      throw new NotFoundException('User not Found')
    }

    const { eventId, price } = sellTicketDto

    const haveEvent = this.findByEventId(eventId)

    if (!haveEvent) {
      throw new NotFoundException('Event not Found')
    }

    const newTicket = await this.ticketRepository.create({
      price,
      code: randomUUID(),
      status: Status.Disponivel,
      user: {
        connect: { id: user.id },
      },
      event: {
        connect: { id: eventId },
      },
      tenant: {
        connect: { id: user.tenantId },
      },
    })

    return newTicket
  }

  async authenticTicket(authenticTicketDto: AuthenticTicketDto, user: User) {
    if (!user) {
      throw new NotFoundException('User not Found')
    }

    // Todo: Check if user is the owner of event

    const { code, userId, eventId } = authenticTicketDto

    const ticket = await this.ticketRepository.findByCodeAndEventIdAndUserId(
      code,
      eventId,
      userId,
    )

    if (!ticket) {
      throw new NotFoundException('Ticket not Found')
    }

    return await this.ticketRepository.update(ticket.id, {
      status: Status.Aceito,
      user: {
        connect: { id: userId },
      },
    })
  }
}
