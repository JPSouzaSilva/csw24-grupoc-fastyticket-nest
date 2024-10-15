import { Module } from '@nestjs/common'
import { TenantService } from '../services/tenant/tenant.service'
import { TenantController } from '../http/controllers/tenant/tenant.controller'
import { PrismaService } from 'src/services/prisma.service'
import { UserService } from 'src/services/user/user.service'

@Module({
  imports: [UserService],
  providers: [TenantService, PrismaService],
  controllers: [TenantController],
})
export class TenantModule {}
