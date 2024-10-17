import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { EventModule } from './modules/event.module';

@Module({
  imports: [UserModule, EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
