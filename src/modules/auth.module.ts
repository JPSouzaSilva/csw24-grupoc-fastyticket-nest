import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from 'src/services/auth/auth.service'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'xanflis',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
