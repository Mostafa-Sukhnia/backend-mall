/*
  Warnings:

  - A unique constraint covering the columns `[village_name]` on the table `Village` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Village_village_name_key" ON "Village"("village_name");
