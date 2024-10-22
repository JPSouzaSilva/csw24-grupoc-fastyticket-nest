# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Copie apenas o package.json e o package-lock.json para instalar dependências
COPY package*.json ./

# Instalar dependências (apenas as necessárias para build)
RUN npm install

# Copie o restante do código
COPY . .

# Gerar o cliente do Prisma
RUN npx prisma generate

# Compilar o código
RUN npm run build

# Etapa 2: Produção
FROM node:18-alpine AS runner

WORKDIR /app

# Copie apenas os arquivos necessários da etapa de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação em modo produção
CMD ["npm", "run", "start:prod"]
