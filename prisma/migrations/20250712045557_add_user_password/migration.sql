/*
  Warnings:

  - Added the required column `password` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "password" TEXT NOT NULL;
