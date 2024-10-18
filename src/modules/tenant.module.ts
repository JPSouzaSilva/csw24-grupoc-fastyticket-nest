import { Module } from '@nestjs/common'
import { TenantService } from '../services/tenant/tenant.service'
import { TenantController } from '../http/controllers/tenant/tenant.controller'
import { PrismaService } from 'src/services/prisma.service'
import { TenantRepository } from 'src/repositories/tenant/tenant.repository'

@Module({
  providers: [TenantService, PrismaService, TenantRepository],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
