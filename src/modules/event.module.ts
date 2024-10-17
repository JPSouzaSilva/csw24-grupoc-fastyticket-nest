import { Module } from '@nestjs/common'
import { EventController } from '../http/controllers/event/event.controller'
import { EventService } from 'src/services/event/event.service'

@Module({
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
