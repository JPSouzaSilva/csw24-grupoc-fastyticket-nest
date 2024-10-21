import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Put,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guard/auth.guard'
import type { AuthenticTicketDto } from 'src/http/dtos/ticket/authentic.ticket.dto'
import { CreateTicketDto } from 'src/http/dtos/ticket/create.ticket.dto'
import { TicketService } from 'src/application/services/ticket/ticket.service'
import { TicketBuyDto } from 'src/http/dtos/ticket/buy.ticket.dto'

@Controller('ticket')
@ApiTags('Ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto, req.user)
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllBougthTickets(@Request() req) {
    return this.ticketService.findAllBougthTickets(req.user)
  }

  @Get('event/:id')
  findById(@Param('id') id: string) {
    return this.ticketService.findByEventId(id)
  }

  @UseGuards(AuthGuard)
  @Post('refund/:ticketId')
  refund(@Request() req, @Param('ticketId') ticketId: string) {
    return this.ticketService.refundTicket(ticketId, req.user)
  }

  @UseGuards(AuthGuard)
  @Post('buy')
  buyTicket(@Request() req, @Body() buyTicketDTO: TicketBuyDto) {
    return this.ticketService.buyTicket(buyTicketDTO, req.user)
  }

  @Put('authenticate')
  @UseGuards(AuthGuard)
  authenticTicket(
    @Request() req,
    @Body() authenticTicketDto: AuthenticTicketDto,
  ) {
    return this.ticketService.authenticate(authenticTicketDto, req.user)
  }
}
