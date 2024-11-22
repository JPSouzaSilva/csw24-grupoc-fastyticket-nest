import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // Cria a aplicação NestJS
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger para documentação da API
  const config = new DocumentBuilder()
    .setTitle('FastyTicket') // Título da documentação
    .setDescription('Documentação da API do projeto FastyTicket') // Descrição
    .setVersion('1.0') // Versão da API
    // Adiciona autenticação HTTP básica
    .addSecurity('apiKey', {
      type: 'http',
      scheme: 'basic',
    })
    // Adiciona autenticação por chave de API no cabeçalho
    .addSecurity('sec0', {
      type: 'apiKey',
      in: 'header',
      name: 'access-token',
    })
    .build();

  // Cria o documento Swagger baseado na configuração
  const document = SwaggerModule.createDocument(app, config);

  // Configura o endpoint da documentação Swagger
  SwaggerModule.setup('docs', app, document);

  // Habilita CORS para permitir requisições de diferentes origens
  app.enableCors({
    origin: '*', // Define que qualquer origem pode acessar a API (ajuste conforme necessário para produção)
  });

  // Inicia o servidor na porta especificada ou na padrão (3000)
  const port = process.env.PORT || 3000;
  await app.listen(port);

  // Exibe informações no console sobre o servidor e documentação
  console.info(`Server is running on http://localhost:${port}`);
  console.info(`The documentation is on http://localhost:${port}/docs`);
}
bootstrap();
