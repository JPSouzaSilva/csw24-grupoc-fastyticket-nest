import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder().setTitle('Fasty Ticket API').build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.enableShutdownHooks()
  await app.listen(3000)
}
bootstrap()
