import { Module } from '@nestjs/common'
import { AuthModule } from './auth.module'
import { DatabaseModule } from './database/database.module'
import { HttpModule } from './http/http.module'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        secure: false,
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: 'fastyticket@email.com',
      },
    }),
    DatabaseModule,
    AuthModule,
    HttpModule,
  ],
})
export class AppModule {}
