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
import { UserRequest } from 'src/decorator/user.decorator'
import { AuthGuard } from 'src/guard/auth.guard'
import type { AuthenticTicketDto } from 'src/http/dtos/ticket/authentic.ticket.dto'
import { CreateTicketDto } from 'src/http/dtos/ticket/create.ticket.dto'
import { TicketBuyDto } from 'src/http/dtos/buy.ticket.dto'
import { TicketService } from 'src/application/services/ticket/ticket.service'

@Controller('ticket')
@ApiTags('Ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto, req)
  }

  @Get('event/:id')
  findById(@Param('id') id: string) {
    return this.ticketService.findByEventId(id)
  }

  @UseGuards(AuthGuard)
  @Post('buy')
  buyTicket(@Request() req, @Body() buyTicketDTO: TicketBuyDto) {
    console.log(buyTicketDTO)
    return this.ticketService.buyTicket(buyTicketDTO, req.user)
  }

  @Put('authenticate')
  @UseGuards(AuthGuard)
  authenticTicket(
    @UserRequest() user,
    @Body() authenticTicketDto: AuthenticTicketDto,
  ) {
    console.log(user)
    console.log(authenticTicketDto)
    return this.ticketService.authenticTicket(authenticTicketDto, user)
  }
}
