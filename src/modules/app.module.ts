import { Module } from '@nestjs/common'
import { TenantModule } from './tenant.module'
import { UserModule } from './user.module'
import { AuthModule } from './auth.module'

@Module({
  imports: [TenantModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
