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

    // Verifica se o Tenant com o id '123' já existe, caso contrário, cria um
    const tenant = await this.tenant.upsert({
      where: { tenantId: '123' },
      update: {},
      create: {
        tenantId: '123',
        name: 'Tenant SUPADMIN',
        contactInfo: 'admin@supadmin.com',
        notificationPreference: true,
      },
    })

    // Verifica se o usuário SUPADMIN já existe, caso contrário, cria um
    await this.user.upsert({
      where: { verified: 'supadmin@admin.comSUPADMIN123' },
      update: {},
      create: {
        name: 'SUPADMIN',
        email: 'supadmin@admin.com',
        role: 'SUPADMIN',
        verified: 'supadmin@admin.comSUPADMIN123',
        tenantId: tenant.tenantId, // Associa ao tenant criado/acessado
        balance: 0,
      },
    })
  }

  async onModuleDestroy() {
    return this.$disconnect()
  }
}
