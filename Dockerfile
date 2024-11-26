FROM node:18-alpine AS builder

# Configurações do diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências e instalar pacotes
COPY package*.json ./
RUN npm install --force

# Copiar o restante dos arquivos do projeto
COPY . .

# Gerar o Prisma Client
RUN npx prisma generate

# Construir a aplicação
RUN npm run build

# Fase de execução
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar arquivos necessários do estágio de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Porta da aplicação
EXPOSE 3000

# Executar o seed antes de iniciar a aplicação
CMD ["sh", "-c", "npx prisma db push && npm run seed && npm run start:prod"]
