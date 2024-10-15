import { Module } from '@nestjs/common'
import { TenantModule } from './tenant.module'
import { UserModule } from './user.module'

@Module({
  imports: [TenantModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
