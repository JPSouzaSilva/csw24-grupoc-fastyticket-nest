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
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guard/auth.guard'
import { CreateEventDto } from 'src/http/dtos/event/create.event.dto'
import { EventService } from 'src/application/services/event/event.service'
import type { UpdateEventDTO } from 'src/http/dtos/event/update.event.dto'

@UseGuards(AuthGuard)
@Controller('event')
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  async create(@Request() req, @Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto, req.user)
  }

  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateEventDto: UpdateEventDTO,
  ) {
    return this.eventService.update(id, updateEventDto, req.user)
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: string, @Request() req) {
    return this.eventService.delete(id, req.user)
  }

  @Get('all')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.eventService.findAll(Number(page) || 1, Number(limit) || 10)
  }
}
