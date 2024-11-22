import { configure as serverlessExpress } from '@vendia/serverless-express'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

let cachedServer

async function createServer() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('FastyTicket') 
    .setDescription('Documentação da API do projeto FastyTicket') // Descrição
    .setVersion('1.0') // Versão da API
    .addSecurity('apiKey', {
      type: 'http',
      scheme: 'basic',
    })
    .addSecurity('sec0', {
      type: 'apiKey',
      in: 'header',
      name: 'access-token',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: '*', 
  })

  await app.init()

  return serverlessExpress({
    app: app.getHttpAdapter().getInstance(),
  })
}

export const handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await createServer()
  }

  return cachedServer(event, context)
}
