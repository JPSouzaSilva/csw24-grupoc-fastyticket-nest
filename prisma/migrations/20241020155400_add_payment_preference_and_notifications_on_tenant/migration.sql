/*
  Warnings:

  - Added the required column `notificationPreference` to the `tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "notificationPreference" BOOLEAN NOT NULL,
ADD COLUMN     "paymentPreference" TEXT;
