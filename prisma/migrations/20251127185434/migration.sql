-- CreateEnum
CREATE TYPE "state_of_create_store" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterTable
ALTER TABLE "Stores" ADD COLUMN     "is_phone_verified" BOOLEAN DEFAULT false,
ADD COLUMN     "state_of_create_store" "state_of_create_store" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "verified_phone_code" INTEGER,
ALTER COLUMN "logo_image" DROP NOT NULL,
ALTER COLUMN "logo_image" SET DEFAULT 'http://localhost:5500/uploads/images/defaultStore.jpg';

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "profile_image" SET DEFAULT 'http://localhost:5500/uploads/images/defaultUser.png';
