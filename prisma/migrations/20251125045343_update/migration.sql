/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "phone_number" TEXT,
ALTER COLUMN "profile_image" SET DEFAULT 'http://localhost:5500/uploads/images/defaultUser.jpg',
ALTER COLUMN "account_number" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_number_key" ON "Users"("phone_number");
