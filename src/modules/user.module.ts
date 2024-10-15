import { Module } from '@nestjs/common'
import { UserService } from '../services/user/user.service'
import { UserController } from '../http/controllers/user/user.controller'
import { PrismaService } from 'src/services/prisma.service'

@Module({
  exports: [UserService],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
