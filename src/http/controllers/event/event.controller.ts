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
  UnauthorizedException,
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthGuard } from 'src/guard/auth.guard'
import { CreateEventDto } from 'src/http/dtos/event/create.event.dto'
import { EventService } from 'src/application/services/event/event.service'
import { UpdateEventDTO } from 'src/http/dtos/event/update.event.dto'

@UseGuards(AuthGuard)
@Controller('event')
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({
    summary: 'Create Event',
    description: 'Create new event as an admin.',
  })
  @ApiResponse({
    status: 201,
    description: 'Event created successfully.',
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
    description: 'Internal Server Error.',
  })
  @ApiBody({
    description: 'Data for creating an event',
    required: true,
    type: CreateEventDto,
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
    description: 'Internal server erro.',
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
        dateAndTime: { type: 'Date', example: '2024-10-21T21:30:30.010Z' },
      },
    },
  })
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateEventDto: UpdateEventDTO,
  ) {
    const ownerId = await this.eventService.getOwnerId(id)

    if (req.user.id !== ownerId) {
      throw new UnauthorizedException(
        'You do not have permission to update this event',
      )
    }
    return this.eventService.update(id, updateEventDto, req.user)
  }

  @ApiOperation({
    summary: 'Delete Event',
    description: 'Delete an event.',
  })
  @ApiResponse({
    status: 200,
    description: 'Event deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request to delete the event.',
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Delete(':id/delete')
  async delete(@Param('id') id: string, @Request() req) {
    const ownerId = await this.eventService.getOwnerId(id)

    if (req.user.id !== ownerId) {
      throw new UnauthorizedException(
        'You do not have permission to update this event',
      )
    }
    return this.eventService.delete(id, req.user)
  }

  @ApiOperation({
    summary: 'List Events',
    description: 'List all events.',
  })
  @ApiResponse({
    status: 200,
    description: 'Events listed successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Request denied.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number. Default: 1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page. Default: 10',
  })
  @Get('all')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.eventService.findAll(Number(page) || 1, Number(limit) || 10)
  }
}
