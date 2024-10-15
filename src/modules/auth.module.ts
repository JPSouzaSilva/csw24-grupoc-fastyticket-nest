import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from './user.module'
import { AuthService } from 'src/services/auth/auth.service'
import { UserService } from 'src/services/user/user.service'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'xanflis',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
