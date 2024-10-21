/*
  Warnings:

  - Added the required column `onwerId` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" ADD COLUMN     "onwerId" TEXT NOT NULL;
