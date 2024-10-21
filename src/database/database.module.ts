import { Module } from '@nestjs/common'
import { ITenantRepository } from 'src/application/repositories/tenant.repository.interface'
import { TenantRepository } from './prisma/repositories/tenant/tenant.repository'
import { IUserRepository } from 'src/application/repositories/user.repository.interface'
import { UserRepository } from './prisma/repositories/user/user.repository'
import { IEventRepository } from 'src/application/repositories/event.repository.interface'
import { ITicketRepository } from 'src/application/repositories/ticket.repository.interface'
import { ITransactionRepository } from 'src/application/repositories/transaction.repository.interface'
import { INotificationPreferencesRepository } from 'src/application/repositories/notification.preferences.repository.interface'
import { PrismaService } from './prisma/prisma.service'
import { NotificationPreferencesRepository } from './prisma/repositories/notification/notification.repository'
import { TransactionRepository } from './prisma/repositories/transaction/transaction.repository'
import { EventRepository } from './prisma/repositories/event/event.repository'
import { TicketRepository } from './prisma/repositories/ticket/ticket.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: ITenantRepository,
      useClass: TenantRepository,
    },
    {
      provide: IEventRepository,
      useClass: EventRepository,
    },
    {
      provide: ITicketRepository,
      useClass: TicketRepository,
    },
    {
      provide: ITransactionRepository,
      useClass: TransactionRepository,
    },
    {
      provide: INotificationPreferencesRepository,
      useClass: NotificationPreferencesRepository,
    },
  ],
  exports: [
    IUserRepository,
    ITenantRepository,
    IEventRepository,
    ITransactionRepository,
    ITicketRepository,
    INotificationPreferencesRepository,
  ],
})
export class DatabaseModule {}
