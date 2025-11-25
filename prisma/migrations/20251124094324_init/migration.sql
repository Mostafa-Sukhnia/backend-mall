/*
  Warnings:

  - The `verified_code` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `date_of_birth` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "profile_image" SET DEFAULT '',
DROP COLUMN "verified_code",
ADD COLUMN     "verified_code" INTEGER;
