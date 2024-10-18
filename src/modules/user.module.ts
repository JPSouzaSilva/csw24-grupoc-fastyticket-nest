import { Module } from '@nestjs/common'
import { UserService } from '../services/user/user.service'
import { UserController } from '../http/controllers/user/user.controller'
import { PrismaService } from 'src/services/prisma.service'
import { UserRepository } from 'src/repositories/user/user.repository'
import { AuthModule } from './auth.module'
import { TenantRepository } from 'src/repositories/tenant/tenant.repository'
import { AuthService } from 'src/services/auth/auth.service'

@Module({
  imports: [AuthModule],
  providers: [
    UserService,
    PrismaService,
    UserRepository,
    AuthService,
    TenantRepository,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
