import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateTicketDto } from 'src/http/dtos/ticket/create.ticket.dto'
import { randomUUID } from 'crypto'
import { TransactionService } from '../transaction/transaction.service'
import { EventService } from '../event/event.service'
import { Ticket } from 'src/application/models/Ticket'
import type { User } from 'src/application/models/User'
import type { TicketSellDto } from 'src/http/dtos/ticket/sell.ticket.dto'
import type { TicketBuyDto } from 'src/http/dtos/ticket/buy.ticket.dto'
import type { CreateTransactionDto } from 'src/http/dtos/transaction/create.transaction.dto'
import { Transaction } from 'src/application/models/Transaction'
import type { AuthenticTicketDto } from 'src/http/dtos/ticket/authentic.ticket.dto'
import { ITicketRepository } from 'src/application/repositories/ticket.repository.interface'
import { MailerService } from '@nestjs-modules/mailer'
import { ticketSoldEmail } from 'src/mail/ticket.sold.email'
import { UserService } from '../user/user.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: ITicketRepository,
    private readonly transactionService: TransactionService,
    private readonly eventService: EventService,
    private readonly mailService: MailerService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createTicketDto: CreateTicketDto, user: User) {
    const event = await this.eventService.findById(createTicketDto.eventId)

    if (!event) {
      throw new NotFoundException('Event not found')
    }

    if (event.ownerId !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to create a ticket for this event',
      )
    }

    const tickets = []
    for (let i = 0; i < createTicketDto.numberOfTickets; i++) {
      tickets[i] = new Ticket({
        code: randomUUID(),
        price: createTicketDto.price,
        status: 'Disponivel',
        eventId: createTicketDto.eventId,
        tenantId: user.tenantId,
        description: createTicketDto.description ?? '',
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
        description: ticket.description,
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
        throw new NotFoundException(`Ticket ${ticket.id} not found`)
      }

      if (ticket.status !== 'Disponivel') {
        throw new BadRequestException(
          `Ticket ${ticket.id}is not available for sale`,
        )
      }

      const owner = await this.userService.findById(ticket.sellerId)

      if (!owner) {
        throw new BadRequestException()
      }

      const newTicket = new Ticket(
        {
          code: ticket.code,
          price: ticket.price,
          status: 'Vendido',
          eventId: event.id,
          tenantId: userToRequest.tenantId,
          sellerId: userToRequest.id,
          description: ticket.description,
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

      const notification = await this.notificationService.findByUserId(owner.id)

      if (notification.receiveEmail) {
        await this.sendMailToTicketOwner(owner.email, event.name)
      }
    }

    return { ticketsToBuy }
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
      description: ticket.description,
    })

    return this.ticketRepository.update(ticket.id, newTicket)
  }

  async refundTicket(ticketId: string, userToRequest: User) {
    const ticket = await this.ticketRepository.findById(ticketId)
    if (!ticket) {
      throw new NotFoundException('Ticket not found')
    }

    if (ticket.status !== 'Disponivel') {
      throw new NotFoundException('Ticket is not available for refund')
    }

    if (ticket.sellerId !== userToRequest.id) {
      throw new UnauthorizedException('You are not the owner of this ticket')
    }

    const newTicket = new Ticket({
      code: ticket.code,
      price: ticket.price,
      status: 'Disponivel',
      eventId: ticket.eventId,
      tenantId: ticket.tenantId,
      description: ticket.description,
      sellerId: null,
    })

    return this.ticketRepository.update(ticketId, newTicket)
  }

  async findByEventId(eventId: string) {
    return this.ticketRepository.findByEventId(eventId)
  }

  async sendMailToTicketOwner(ownerMail: string, eventName: string) {
    await this.mailService.sendMail({
      to: ownerMail,
      subject: 'Ingresso Vendido',
      html: ticketSoldEmail(eventName),
    })
  }
}
