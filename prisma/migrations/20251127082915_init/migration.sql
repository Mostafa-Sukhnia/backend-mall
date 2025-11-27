/*
  Warnings:

  - Added the required column `gender` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "identity_verification_status" AS ENUM ('NONE', 'PENDING', 'VERIFIED', 'REJECTED');

-- AlterTable
ALTER TABLE "Notifications" ALTER COLUMN "is_read" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "UserRole" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "identity_verification_status" "identity_verification_status" DEFAULT 'NONE';
