import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { HttpModule } from './http/http.module'
import { AuthModule } from './auth.module'

@Module({
  imports: [DatabaseModule, HttpModule, AuthModule],
})
export class AppModule {}
