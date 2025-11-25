/*
  Warnings:

  - Made the column `verified_phone_code` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "verified_phone_code" SET NOT NULL;
