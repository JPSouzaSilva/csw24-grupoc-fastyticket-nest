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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthGuard } from 'src/guard/auth.guard'
import { AuthenticTicketDto } from 'src/http/dtos/ticket/authentic.ticket.dto'
import { CreateTicketDto } from 'src/http/dtos/ticket/create.ticket.dto'
import { TicketService } from 'src/application/services/ticket/ticket.service'
import { TicketBuyDto } from 'src/http/dtos/ticket/buy.ticket.dto'

@Controller('ticket')
@ApiTags('Ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiOperation({
    summary: 'Make Tickets Available',
    description: 'Makes new tickets available for an event.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tickets made available successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiBody({
    description: 'Data for making new tickets available.',
    required: true,
    type: CreateTicketDto,
  })
  create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto, req.user)
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllBougthTickets(@Request() req) {
    return this.ticketService.findAllBougthTickets(req.user)
  }

  @ApiOperation({
    summary: 'Search Tickets by Event',
    description: 'Fetches all tickets for an event.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tickets listed successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'id',
    description: 'Event Id',
  })
  @Get('event/:id')
  findById(@Param('id') id: string) {
    return this.ticketService.findByEventId(id)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Refund Ticket',
    description: 'Refund a ticket.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket refunded successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'ticketId',
    description: 'Ticket Id',
  })
  @Post('refund/:ticketId')
  refund(@Request() req, @Param('ticketId') ticketId: string) {
    return this.ticketService.refundTicket(ticketId, req.user)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Buy Ticket',
    description: 'Purchase a ticket.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tickets purchased successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiBody({
    description: 'Data for the ticket purchase',
    required: true,
    type: TicketBuyDto,
  })
  @Post('buy')
  buyTicket(@Request() req, @Body() buyTicketDTO: TicketBuyDto) {
    return this.ticketService.buyTicket(buyTicketDTO, req.user)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Authenticate Ticket',
    description: 'Authenticate a ticket.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket authenticated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiBody({
    description: 'Data for the ticket authentication',
    required: true,
    type: AuthenticTicketDto,
  })
  @Put('authenticate')
  authenticTicket(
    @Request() req,
    @Body() authenticTicketDto: AuthenticTicketDto,
  ) {
    return this.ticketService.authenticate(authenticTicketDto, req.user)
  }
}
