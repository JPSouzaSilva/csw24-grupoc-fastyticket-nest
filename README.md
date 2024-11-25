## Trabalho 2 - Construção de Software

### Grupo: João Pedro Silva, Luis Felipe Rossi, Arthur Igansi e Pablo Montiel.
### Stack: NestJS, PrismaORM, PostgreSQL

## Como rodar o projeto

- Para rodar o projeto, primeiro você deve criar o arquivo .env na raiz do projeto.
- Em seguida, copie o conteúdo do arquivo .env.example e coloque o dados corretos lá.

### Importante
- Nesse projeto, foi utilizado o MailTrap para o envio de emails, então você deve criar uma conta no MailTrap e colocar o username e password dele no .env

- Em seguida, rode o seguintes comandos no terminal
```bash
$ npm install

$ docker compose up -d
```

## Deploy

- Para realizar o deploy, podemos fazer ele somente pela pipeline do Github, pois ao fazer ele localmente, acaba estourando a memoria da lambda.
