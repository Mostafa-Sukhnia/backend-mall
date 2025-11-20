-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_image" TEXT,
    "account_number" TEXT NOT NULL,
    "verified_code" VARCHAR(12),
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "password_changed" BOOLEAN NOT NULL DEFAULT false,
    "identity_image_front" TEXT,
    "identity_image_back" TEXT,
    "city_id" INTEGER,
    "village_id" INTEGER,
    "location_id" INTEGER,
    "identity_image_is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "notification_id" INTEGER,
    "password_changed_at" TIMESTAMP(3),
    "verified_at" TIMESTAMP(3),
    "changed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_account_number_key" ON "User"("account_number");
