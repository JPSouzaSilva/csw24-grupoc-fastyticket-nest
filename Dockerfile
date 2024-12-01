FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env /app/.env

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push && npm run seed && npm run start"]