/*
  Warnings:

  - A unique constraint covering the columns `[verified]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_email_key";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "verified" TEXT NOT NULL DEFAULT 'xd';

-- CreateIndex
CREATE UNIQUE INDEX "user_verified_key" ON "user"("verified");
