/*
  Warnings:

  - Made the column `verified_code` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "is_phone_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verified_phone_code" INTEGER,
ALTER COLUMN "verified_code" SET NOT NULL;
