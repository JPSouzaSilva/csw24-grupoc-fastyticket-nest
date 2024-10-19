import { Module } from '@nestjs/common'
import { TenantModule } from './tenant.module'
import { UserModule } from './user.module'
import { AuthModule } from './auth.module'
import { EventModule } from './event.module'
import { TicketModule } from './ticket.module'
import { TransactionModule } from './transaction.module'

@Module({
  imports: [
    TenantModule,
    UserModule,
    AuthModule,
    EventModule,
    TicketModule,
    TransactionModule,
  ],
})
export class AppModule {}
