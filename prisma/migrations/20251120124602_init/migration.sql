/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
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
    "city_id" INTEGER NOT NULL,
    "village_id" INTEGER NOT NULL,
    "identity_image_is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "notification_id" INTEGER NOT NULL,
    "password_changed_at" TIMESTAMP(3),
    "verified_at" TIMESTAMP(3),
    "changed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "City" (
    "city_id" SERIAL NOT NULL,
    "city_name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "Village" (
    "village_id" SERIAL NOT NULL,
    "village_name" TEXT NOT NULL,

    CONSTRAINT "Village_pkey" PRIMARY KEY ("village_id")
);

-- CreateTable
CREATE TABLE "Location_map_user" (
    "location_map_user_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "name_location" TEXT NOT NULL,

    CONSTRAINT "Location_map_user_pkey" PRIMARY KEY ("location_map_user_id")
);

-- CreateTable
CREATE TABLE "Location" (
    "location_id" SERIAL NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "accuracy" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("location_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_account_number_key" ON "Users"("account_number");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_village_id_fkey" FOREIGN KEY ("village_id") REFERENCES "Village"("village_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location_map_user" ADD CONSTRAINT "Location_map_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location_map_user" ADD CONSTRAINT "Location_map_user_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;
