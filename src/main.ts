import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Titulo')
    .setDescription('Documentação da API do projeto')
    .setVersion('1.0')
    .addTag('Tag')
    .addSecurity('apiKey', {
      type: 'http',
      scheme: 'basic',
    })
    .addSecurity('sec0', {
      type: 'apiKey',
      in: 'header',
      name: 'access-token',
    })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  app.use(
    '/docs',
    apiReference({
      theme: 'alternate',
      darkMode: true,
      layout: 'modern',
      spec: {
        content: document,
      },
    }),
  )
  app.enableCors({
    origin: '*',
  })

  await app.listen(3000)
  console.info(
    `Server is running on http://localhost:${process.env.PORT || 8080}`,
  )
  console.info(
    `The documentation is on http://localhost:${process.env.PORT || 8080}/docs`,
  )
}
bootstrap()
