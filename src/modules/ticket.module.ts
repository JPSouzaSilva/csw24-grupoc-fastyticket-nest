import { Module } from '@nestjs/common'
import { TicketController } from 'src/http/controllers/ticket/ticket.controller'
import { TicketService } from 'src/services/ticket/ticket.service'
import { UserModule } from './user.module'
import { TicketRepository } from 'src/repositories/ticket/ticket.repository'
import { PrismaService } from 'src/services/prisma.service'
import { TransactionModule } from './transaction.module'
import { EventModule } from './event.module'

@Module({
  imports: [UserModule, TransactionModule, EventModule],
  controllers: [TicketController],
  providers: [TicketService, TicketRepository, PrismaService],
})
export class TicketModule {}
