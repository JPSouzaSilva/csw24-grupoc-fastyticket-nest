import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guard/auth.guard'
import { CreateEventDto } from 'src/http/dtos/event/create.event.dto'
import { EventService } from 'src/application/services/event/event.service'
import { Roles } from 'src/decorator/roles.decorator'
import { Role } from 'src/lib/role.enum'
@UseGuards(AuthGuard)
@Controller('event')
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Roles(Role.ADMIN)
  @Post('create')
  async create(@Request() req, @Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto, req.user)
  }

  @Get('all')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.eventService.findAll(Number(page) || 1, Number(limit) || 10)
  }
}
