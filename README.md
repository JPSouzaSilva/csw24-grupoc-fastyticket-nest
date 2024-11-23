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

- Para realizar o deploy, podemos fazer ele pela pipeline configurando no repositório do Github, as secrets da AWS, junto com a URL do banco de dados
ou configurando as credencias na AWS CLI e no .env colocar somente a AWS_IAM_ROLE e DATABASE_URL, ou colocando todos os dados no .env, seguindo exemplo do .env.example

- Logo após isso, rodar o comando no terminal:
```bash
$ npm run deploy
```