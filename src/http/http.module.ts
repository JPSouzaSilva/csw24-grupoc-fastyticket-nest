import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { EventController } from './controllers/event/event.controller'
import { TenantController } from './controllers/tenant/tenant.controller'
import { TicketController } from './controllers/ticket/ticket.controller'
import { UserController } from './controllers/user/user.controller'
import { AuthService } from 'src/application/services/auth/auth.service'
import { EventService } from 'src/application/services/event/event.service'
import { TenantService } from 'src/application/services/tenant/tenant.service'
import { TicketService } from 'src/application/services/ticket/ticket.service'
import { TransactionService } from 'src/application/services/transaction/transaction.service'
import { UserService } from 'src/application/services/user/user.service'

@Module({
  imports: [DatabaseModule],
  controllers: [
    EventController,
    TenantController,
    TicketController,
    UserController,
  ],
  providers: [
    AuthService,
    EventService,
    TenantService,
    TicketService,
    TransactionService,
    UserService,
  ],
})
export class HttpModule {}
