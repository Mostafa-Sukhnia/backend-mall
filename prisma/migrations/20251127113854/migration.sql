/*
  Warnings:

  - You are about to drop the column `identity_image_is_verified` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[current_token]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phone_number` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "identity_image_is_verified",
ADD COLUMN     "current_token" TEXT,
ALTER COLUMN "phone_number" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_current_token_key" ON "Users"("current_token");
