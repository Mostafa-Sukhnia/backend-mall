/*
  Warnings:

  - You are about to drop the column `password_changed` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "password_changed",
ADD COLUMN     "password_reset_code_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password_reset_requested" BOOLEAN NOT NULL DEFAULT false;
