import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }

  async onModuleInit() {
    await this.$connect()

    const tenantId = '123'
    const existingTenant = await this.tenant.findUnique({
      where: { tenantId },
    })

    if (!existingTenant) {
      await this.tenant.create({
        data: {
          tenantId,
          name: 'Tenant',
          contactInfo: 'contact@example.com',
          paymentPreference: 'Bitcoin',
          notificationPreference: true,
        },
      })
    }
  }

  async onModuleDestroy() {
    return this.$disconnect()
  }
}
