import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger'
import { AuthGuard } from 'src/guard/auth.guard'
import { CreateEventDto } from 'src/http/dtos/event/create.event.dto'
import { EventService } from 'src/application/services/event/event.service'
import { UpdateEventDTO } from 'src/http/dtos/event/update.event.dto'
import { date } from 'zod'

@UseGuards(AuthGuard)
@Controller('event')
@ApiTags('Event')
@ApiBearerAuth()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({
    summary: 'Create Event',
    description: 'Create new event as an admin.',
  })
  @ApiResponse({
    status: 201,
    description: 'Event created successfully.',
    example: {
      message: 'Event created successfully.'
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
    example: {
      message: 'The data provided for creating an event is invalid.'
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
    example: {
      message: 'Unauthorized.'
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    example: {
      message: 'Internal server error.'
    }
  })
  @ApiBody({
    description: 'Data for creating an event',
    required: true,
    type: CreateEventDto,
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Numanice' },
        type: { type: 'string', example: 'show' },
        location: { type: 'string', example: 'Parque Harmonia' },
        dateAndTime: { type: 'Date', example: '2024-10-21T21:30:30.010Z' }
      }
    }
  })
  @Post('create')
  async create(@Request() req, @Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto, req.user)
  }

  @ApiOperation({
    summary: 'Update Event',
    description: 'Update data from an event.',
  })
  @ApiResponse({
    status: 200,
    description: 'Event updated successfully.',
    example: {
      message: 'Event updated successfully.',
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
    example: {
      message: 'The data provided for updating an event is invalid.',
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
    description: 'Internal server erro.',
    example: {
      message: 'Internal server erro.',
    }
  })
  @ApiBody({
    description: 'Data to update an event',
    required: true,
    type: UpdateEventDTO,
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Numanice 2' },
        type: { type: 'string', example: 'show' },
        location: { type: 'string', example: 'Parque Farroupilha' },
        dateAndTime: { type: 'Date', example: '2024-10-21T21:30:30.010Z' }
      }
    }
  })
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateEventDto: UpdateEventDTO,
  ) {
    return this.eventService.update(id, updateEventDto, req.user)
  }

  @ApiOperation({
    summary: 'Delete Event',
    description: 'Delete an event.',
  })
  @ApiResponse({
    status: 200,
    description: 'Event deleted successfully.',
    example: {
      message: 'Event deleted successfully.',
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request to delete the event.',
    example: {
      message: 'The data provided for deleting the event is invalid.',
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
  @Delete(':id/delete')
  async delete(@Param('id') id: string, @Request() req) {
    return this.eventService.delete(id, req.user)
  }

  @ApiOperation({
    summary: 'List Events',
    description: 'List all events.',
  })
  @ApiResponse({
    status: 200,
    description: 'Events listed successfully.',
    example: [
        {
          eventId: '1',
          tenantId: '123',
          name: 'Numanice',
          type: 'show',
          location: 'Parque Harmonia',
          ownerId: 'clj0f5w9b0000ldqk8zse72y4',
          dateAndTime: '2024-10-21T21:30:30.010Z'
        },
        {
          eventId: '2',
          tenantId: '456',
          name: 'Roger Waters',
          type: 'show',
          location: 'Arena do Grêmio',
          ownerId: 'clj0f5w9b0000ldqk8zse72y4',
          dateAndTime: '2024-10-21T21:30:30.010Z'
        }
      ]
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request.',
    example: {
      message: 'Invalid request.'
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
    example: {
      message: 'Unauthorized.'
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    example: {
      message: 'Internal server error.'
    }
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number. Default: 1',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page. Default: 10',
    example: 10,
  })
  @Get('all')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.eventService.findAll(Number(page) || 1, Number(limit) || 10)
  }
}
