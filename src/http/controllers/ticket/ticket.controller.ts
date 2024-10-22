import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Put
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { AuthGuard } from 'src/guard/auth.guard'
import { AuthenticTicketDto } from 'src/http/dtos/ticket/authentic.ticket.dto'
import { CreateTicketDto } from 'src/http/dtos/ticket/create.ticket.dto'
import { TicketService } from 'src/application/services/ticket/ticket.service'
import { TicketBuyDto } from 'src/http/dtos/ticket/buy.ticket.dto'
import { User } from 'src/application/models/User'

@Controller('ticket')
@ApiTags('Ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Make Tickets Available',
    description: 'Makes new tickets available for an event.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tickets made available successfully.',
    example: {
      message: 'Tickets made available successfully.'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
    example: {
      message: 'The data provided for the new tickets is invalid.',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
    example: {
      message: 'Unauthorized.',
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    example: {
      message: 'Internal server error.',
    }
  })
  @ApiBody({
    description: 'Data for making new tickets available.',
    required: true,  
    type: CreateTicketDto
  })
  @Post('create')
  create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto, req.user)
  }

  @ApiOperation({
    summary: 'Search Tickets by Event',
    description: 'Fetches all tickets for an event.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tickets listed successfully.',
    example: [
        {
          ticketId: '1',
          eventId: '123',
          tenantId: '321',
          price: 150.0,
          sellerId: '111',
          code: 'abc123',
          status: 'disponível',
          description: 'show'
        },
        {
          ticketId: '2',
          eventId: '321',
          tenantId: '333',
          price: 180.0,
          sellerIdr: '222',
          code: 'cbd321',
          status: 'disponível',
          description: 'show'
        }
      ]
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid provided data.',
    example: {
        message: 'The data provided to search for tickets is invalid.',
    }
  })
  @ApiResponse({
      status: 401,
      description: 'Request denied.',
      example: {
          message: 'Unauthorized.',
      }
  })
  @ApiResponse({
      status: 500,
      description: 'Internal server error.',
      example: {
          message: 'Internal server error.',
      }
  })
  @ApiParam({
    name: 'id',
    description: 'Event Id',
    example: '123'
  })
  @Get('event/:id')
  findById(@Param('id') id: string) {
    return this.ticketService.findByEventId(id)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Buy Ticket',
    description: 'Purchase a ticket.',
  })
  @ApiResponse({
      status: 200,
      description: 'Tickets purchased successfully.',
      example: {
          message: 'Purchase completed successfully.'
      } 
  })
  @ApiResponse({
      status: 400,
      description: 'Invalid provided data.',
      example: {
          message: 'The data provided for the ticket purchase is invalid.',
      }
  })
  @ApiResponse({
      status: 401,
      description: 'Request denied.',
      example: {
          message: 'Unauthorized.',
      }
  })
  @ApiResponse({
      status: 500,
      description: 'Internal server error.',
      example: {
          message: 'Internal server error.',
      }
  })
  @ApiBody({
    description: 'Data for the ticket purchase',
    required: true,
    type: TicketBuyDto
  })
  @Post('buy')
  buyTicket(@Request() req, @Body() buyTicketDTO: TicketBuyDto) {
    return this.ticketService.buyTicket(buyTicketDTO, req.user)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Authenticate Ticket',
    description: 'Authenticates a ticket by its verification code.',
  })
  @ApiResponse({
      status: 200,
      description: 'Ticket authenticated successfully.',
      example: {
          message: 'Ticket authenticated successfully.'
      }
  })
  @ApiResponse({
      status: 400,
      description: 'Invalid provided data.',
      example: {
          message: 'The data provided for ticket authentication is invalid.',
      }
  })
  @ApiResponse({
      status: 401,
      description: 'Request denied.',
      example: {
          message: 'Unauthorized.',
      }
  })
  @ApiResponse({
      status: 500,
      description: 'Internal server error.',
      example: {
          message: 'Internal server error.',
      }
  })
  @ApiBody({
    description: 'Data for ticket authentication',
    required: true,
    type: AuthenticTicketDto
  })
  @Put('authenticate')
  @UseGuards(AuthGuard)
  authenticTicket(
    @Request() req,
    @Body() authenticTicketDto: AuthenticTicketDto,
  ) {
    return this.ticketService.authenticate(authenticTicketDto, req.user)
  }
}
