import { Module } from '@nestjs/common'
import { EventController } from '../http/controllers/event/event.controller'
import { EventService } from 'src/services/event/event.service'
import { EventRepository } from 'src/repositories/event/event.repository'
import { UserModule } from './user.module'
import { PrismaService } from 'src/services/prisma.service'

@Module({
  imports: [UserModule],
  controllers: [EventController],
  providers: [EventService, EventRepository, PrismaService],
  exports: [EventService],
})
export class EventModule {}
