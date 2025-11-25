-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "is_phone_verified" DROP NOT NULL,
ALTER COLUMN "verified_phone_code" DROP NOT NULL;
