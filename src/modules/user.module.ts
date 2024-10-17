import { forwardRef, Module } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { UserController } from '../http/controllers/user/user.controller';
import { PrismaService } from 'src/services/prisma.service';
import { AuthModule } from './auth.module';
import { AuthService } from 'src/services/auth/auth.service';
import { UserRepository } from 'src/repositories/user/user.repository';

@Module({
  exports: [UserService],
  imports: [forwardRef(() => AuthModule)],  // Usando forwardRef
  providers: [UserService, PrismaService, AuthService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
