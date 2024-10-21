import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from 'src/application/services/auth/auth.service'

@Module({
  imports: [
    JwtModule.register({
      secret: 'xanflis',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
