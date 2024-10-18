import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common'
import { AuthGuard } from 'src/guard/auth.guard'
import { CreateEventDto } from 'src/http/dtos/create.event.dto'
import { EventService } from 'src/services/event/event.service'
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Request() req, @Body() createEventDto: CreateEventDto) {
    return this.eventService.create(req, createEventDto)
  }

  @Get('all')
  findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
      return this.eventService.findAll(Number(page) || 1, Number(limit) || 10);
  }
}
