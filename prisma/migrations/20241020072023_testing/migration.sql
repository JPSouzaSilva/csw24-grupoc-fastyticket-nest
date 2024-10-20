/*
  Warnings:

  - The primary key for the `notification_preferences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `notification_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `push_notification` on the `notification_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `receive_email` on the `notification_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `notification_preferences` table. All the data in the column will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `privacy_configs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tickets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `notification_preferences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `preferencesId` to the `notification_preferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiveEmails` to the `notification_preferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `notification_preferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "notification_preferences" DROP CONSTRAINT "notification_preferences_user_id_fkey";

-- DropForeignKey
ALTER TABLE "privacy_configs" DROP CONSTRAINT "privacy_configs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_event_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_user_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_tenant_id_fkey";

-- DropIndex
DROP INDEX "notification_preferences_id_key";

-- DropIndex
DROP INDEX "notification_preferences_user_id_key";

-- AlterTable
ALTER TABLE "notification_preferences" DROP CONSTRAINT "notification_preferences_pkey",
DROP COLUMN "id",
DROP COLUMN "push_notification",
DROP COLUMN "receive_email",
DROP COLUMN "user_id",
ADD COLUMN     "preferencesId" TEXT NOT NULL,
ADD COLUMN     "receiveEmails" BOOLEAN NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "notification_preferences_pkey" PRIMARY KEY ("preferencesId");

-- DropTable
DROP TABLE "events";

-- DropTable
DROP TABLE "privacy_configs";

-- DropTable
DROP TABLE "tenants";

-- DropTable
DROP TABLE "tickets";

-- DropTable
DROP TABLE "transactions";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "tenant" (
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT,
    "specificSettings" TEXT,

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("tenantId")
);

-- CreateTable
CREATE TABLE "user" (
    "userId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "event" (
    "eventId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "ticket" (
    "ticketId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sellerId" TEXT NOT NULL,
    "uniqueVerificationCode" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "transaction" (
    "transactionId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "transactionStatus" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_ticketId_key" ON "transaction"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "notification_preferences_userId_key" ON "notification_preferences"("userId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("tenantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("tenantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("tenantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("tenantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ticket"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_preferences" ADD CONSTRAINT "notification_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
