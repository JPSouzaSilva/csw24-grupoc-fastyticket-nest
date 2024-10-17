import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [
    forwardRef(() => UserModule),  // Usando forwardRef
    JwtModule.register({
      global: true,
      secret: 'xanflis',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [AuthService, UserService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
