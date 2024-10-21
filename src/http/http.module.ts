import { Module } from '@nestjs/common'
import { AuthModule } from '../auth.module' // Ensure correct path
import { EventService } from 'src/application/services/event/event.service'
import { TenantService } from 'src/application/services/tenant/tenant.service'
import { TicketService } from 'src/application/services/ticket/ticket.service'
import { TransactionService } from 'src/application/services/transaction/transaction.service'
import { UserService } from 'src/application/services/user/user.service'
import { DatabaseModule } from 'src/database/database.module'
import { EventController } from './controllers/event/event.controller'
import { TenantController } from './controllers/tenant/tenant.controller'
import { TicketController } from './controllers/ticket/ticket.controller'
import { UserController } from './controllers/user/user.controller'
import { NotificationService } from 'src/application/services/notification/notification.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [
    EventController,
    TenantController,
    TicketController,
    UserController,
  ],
  providers: [
    EventService,
    TenantService,
    TicketService,
    TransactionService,
    UserService,
    NotificationService,
    JwtService,
  ],
})
export class HttpModule {}
