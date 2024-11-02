/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");
