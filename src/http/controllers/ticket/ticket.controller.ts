import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common'
import { AuthGuard } from 'src/guard/auth.guard'
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
}
