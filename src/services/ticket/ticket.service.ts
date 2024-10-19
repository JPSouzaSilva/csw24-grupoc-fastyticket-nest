import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTicketDto } from 'src/http/dtos/create.ticket.dto'
import { UserService } from '../user/user.service'
import { TicketRepository } from 'src/repositories/ticket/ticket.repository'
import { randomUUID } from 'crypto'
import type { TicketBuyDto } from 'src/http/dtos/buy.ticket.dto'
import { Status } from 'src/lib/status.enum'
import type { Ticket, User } from '@prisma/client'
import type { SellTicketDto } from 'src/http/dtos/sell.ticket.dto'
import type { AuthenticTicketDto } from 'src/http/dtos/authentic.ticket.dto'
import { TransactionService } from '../transaction/transaction.service'
import { EventService } from '../event/event.service'
import { log } from 'console'

@Injectable()
export class TicketService {
  constructor(
    private readonly userService: UserService,
    private readonly ticketRepository: TicketRepository,
    private readonly transactionService: TransactionService,
    private readonly eventService: EventService,
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
    this.validateUser(user)

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

  async buyTicket(buyTicketDTO: TicketBuyDto, req) {
    const user = await this.userService.findByEmailOrUsername(
      req.username,
      req.email,
    )
    this.validateUser(user)

    const { eventId, tickets } = buyTicketDTO
    const event = await this.findByEventId(eventId)
    if (!event) {
      throw new NotFoundException('Event not Found')
    }

    const ticketsAvailable = await this.getAvailableTickets(eventId, tickets)
    return await this.processTicketPurchase(ticketsAvailable, tickets, user)
  }

  private validateUser(user: User): void {
    if (!user) {
      throw new NotFoundException('User not Found')
    }
  }

  async getAvailableTickets(
    eventId: string,
    tickets: string[],
  ): Promise<Ticket[]> {
    const ticketsAvailable = []

    for (let i = 0; i < tickets.length; i++) {
      const ticket = await this.ticketRepository.findAvaiableByEventId(
        eventId,
        tickets[i],
      )
      if (!ticket) {
        throw new NotFoundException('Ticket not Found')
      }
      if (ticket.status !== Status.Disponivel) {
        throw new NotFoundException('Ticket not available')
      }

      ticketsAvailable.push(ticket)
    }

    return ticketsAvailable
  }

  private async processTicketPurchase(
    ticketsAvailable: Ticket[],
    tickets: string[],
    user: User,
  ): Promise<Ticket[]> {
    const ticketsBought = []

    for (let i = 0; i < tickets.length; i++) {
      const ticket = ticketsAvailable[i]
      ticketsBought.push(
        await this.ticketRepository.update(ticket.id, {
          status: Status.Aceito,
          user: {
            connect: { id: user.id },
          },
        }),
      )
      await this.createTransaction(ticket, user)
    }

    return ticketsBought
  }

  private async createTransaction(ticket: Ticket, user: User): Promise<string> {
    log('Creating transaction')
    await this.transactionService.create({
      price: ticket.price,
      date: new Date(),
      status: Status.Aceito,
      tenantId: user.tenantId,
      userId: user.id,
      ticketId: ticket.id,
    })

    return 'Transaction created'
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

    return {
      id: newTicket.id,
      code: newTicket.code,
      price: newTicket.price,
      status: newTicket.status,
    }
  }

  async authenticTicket(authenticTicketDto: AuthenticTicketDto, user: User) {
    if (!user) {
      throw new NotFoundException('User not Found')
    }
    console.log(user)

    // Todo: Check if user is the owner of event

    const event = await this.eventService.findById(authenticTicketDto.eventId)
    if (!event) {
      throw new NotFoundException('Event not Found')
    }
    const isOwner = event.ownerId === user.id
    console.log(isOwner)
    console.log(user.id)
    if (!isOwner) {
      throw new NotFoundException('User not allowed to authenticate ticket')
    }

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
