/*
  Warnings:

  - A unique constraint covering the columns `[city_name]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city_id` to the `Village` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_city_id_fkey";

-- AlterTable
ALTER TABLE "Village" ADD COLUMN     "city_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "City_city_name_key" ON "City"("city_name");

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;
