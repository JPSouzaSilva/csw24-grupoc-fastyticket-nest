import { Module } from '@nestjs/common'
import { AuthModule } from './auth.module'
import { DatabaseModule } from './database/database.module'
import { HttpModule } from './http/http.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './guard/roles.guard'

@Module({
  imports: [DatabaseModule, AuthModule, HttpModule],

  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
