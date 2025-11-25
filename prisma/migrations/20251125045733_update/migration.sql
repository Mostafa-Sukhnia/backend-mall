/*
  Warnings:

  - You are about to drop the column `account_number` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `notification_id` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_account_number_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "account_number",
DROP COLUMN "notification_id";
