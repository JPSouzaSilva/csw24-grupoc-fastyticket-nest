import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateTicketDto } from 'src/http/dtos/create.ticket.dto';
import { TicketService } from 'src/services/ticket/ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto, req);
  }
}
