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
import type { User } from '@prisma/client'
import { UserRequest } from 'src/decorator/user.decorator'
import { AuthGuard } from 'src/guard/auth.guard'
import type { AuthenticTicketDto } from 'src/http/dtos/authentic.ticket.dto'
import { CreateTicketDto } from 'src/http/dtos/create.ticket.dto'
import { TicketService } from 'src/services/ticket/ticket.service'

@Controller('ticket')
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

  @Post('buy')
  buyTicket(@Body() buyTicketDTO, @UserRequest() user: User) {
    return this.ticketService.buyTicket(buyTicketDTO, user)
  }

  @Put('authenticate')
  authenticTicket(
    @Body() authenticTicketDto: AuthenticTicketDto,
    @UserRequest() user: User,
  ) {
    return this.ticketService.authenticTicket(authenticTicketDto, user)
  }
}
