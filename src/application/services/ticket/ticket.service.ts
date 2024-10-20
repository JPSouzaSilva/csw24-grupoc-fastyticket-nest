import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTicketDto } from 'src/http/dtos/ticket/create.ticket.dto'
import { UserService } from '../user/user.service'
import { randomUUID } from 'crypto'
import { TransactionService } from '../transaction/transaction.service'
import { EventService } from '../event/event.service'
import type { ITicketRepository } from 'src/application/repositories/ticket.repository.interface'
import { Ticket } from 'src/application/models/Ticket'
import type { User } from 'src/application/models/User'
import type { TicketSellDto } from 'src/http/dtos/ticket/sell.ticket.dto'
import type { TicketBuyDto } from 'src/http/dtos/ticket/buy.ticket.dto'
import type { CreateTransactionDto } from 'src/http/dtos/transaction/create.transaction.dto'
import { Transaction } from 'src/application/models/Transaction'
import type { AuthenticTicketDto } from 'src/http/dtos/ticket/authentic.ticket.dto'

@Injectable()
export class TicketService {
  constructor(
    private readonly userService: UserService,
    private readonly ticketRepository: ITicketRepository,
    private readonly transactionService: TransactionService,
    private readonly eventService: EventService,
  ) {}

  async create(createTicketDto: CreateTicketDto, user: User) {
    const tickets = []
    for (let i = 0; i < createTicketDto.numberOfTickets; i++) {
      tickets[i] = new Ticket({
        code: randomUUID(),
        price: createTicketDto.price,
        status: 'Disponivel',
        eventId: createTicketDto.eventId,
        tenantId: user.tenantId,
        sellerId: user.id,
      })

      const ticket = await this.ticketRepository.create(tickets[i])
      tickets.push(ticket)
    }

    return { tickets }
  }

  async sellTicket(sellTicketDTO: TicketSellDto, userToRequest: User) {
    const { price, eventId, ticketId } = sellTicketDTO

    const event = await this.eventService.findById(eventId)

    if (!event) {
      throw new NotFoundException('Event not found')
    }

    const ticket = await this.ticketRepository.findById(ticketId)

    if (!ticket) {
      throw new NotFoundException('Ticket not found')
    }

    const newTicket = new Ticket(
      {
        code: ticket.code,
        price,
        status: 'Disponivel',
        eventId: event.id,
        tenantId: userToRequest.tenantId,
        sellerId: userToRequest.id,
      },
      ticket.id,
    )

    const ticketToSell = await this.ticketRepository.update(ticketId, newTicket)

    return ticketToSell
  }

  async buyTicket(buyTicketDto: TicketBuyDto, userToRequest: User) {
    const { eventId, tickets } = buyTicketDto

    const event = await this.eventService.findById(eventId)

    if (!event) {
      throw new NotFoundException('Event not found')
    }

    const ticketsToBuy = []
    for (let i = 0; i < tickets.length; i++) {
      const ticket = await this.ticketRepository.findById(tickets[i])

      if (!ticket) {
        throw new NotFoundException('Ticket not found')
      }

      const newTicket = new Ticket(
        {
          code: ticket.code,
          price: ticket.price,
          status: 'Vendido',
          eventId: event.id,
          tenantId: userToRequest.tenantId,
          sellerId: userToRequest.id,
        },
        ticket.id,
      )

      const ticketToBuy = await this.ticketRepository.update(
        tickets[i],
        newTicket,
      )
      ticketsToBuy.push(ticketToBuy)

      await this.createTransaction({
        buyerId: userToRequest.id,
        dateTransaction: new Date(),
        price: newTicket.price,
        status: 'Aprovado',
        tenantId: userToRequest.tenantId,
        ticketId: newTicket.id,
      })
    }
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const { buyerId, dateTransaction, price, status, tenantId, ticketId } =
      createTransactionDto

    const transaction = new Transaction({
      ticketId,
      buyerId,
      dateTransaction,
      price,
      status,
      tenantId,
    })

    return this.transactionService.create(transaction)
  }

  async authenticate(authenticateTicketDto: AuthenticTicketDto) {
    const { code, eventId, userId } = authenticateTicketDto

    const ticket = await this.ticketRepository.findByCodeAndEventIdAndUserId(
      code,
      eventId,
      userId,
    )

    if (!ticket) {
      throw new NotFoundException('Ticket not found')
    }

    const newTicket = new Ticket({
      code: ticket.code,
      price: ticket.price,
      status: 'Autenticado',
      eventId: ticket.eventId,
      tenantId: ticket.tenantId,
      sellerId: ticket.sellerId,
    })

    return this.ticketRepository.update(ticket.id, newTicket)
  }
}
