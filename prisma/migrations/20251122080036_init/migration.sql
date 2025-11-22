-- CreateTable
CREATE TABLE "Notifications" (
    "notification_id" SERIAL NOT NULL,
    "notification_type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "Notifications_map_user" (
    "map_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "notification_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_map_user_pkey" PRIMARY KEY ("map_id")
);

-- CreateTable
CREATE TABLE "Ratings_and_reviews" (
    "review_id" SERIAL NOT NULL,
    "reviewer_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reviewed_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cahnged_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ratings_and_reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "Stores" (
    "store_id" SERIAL NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_description" TEXT NOT NULL,
    "logo_image" TEXT NOT NULL,
    "phon_number" TEXT NOT NULL,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "Store_location" (
    "store_location_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "locatio_name" TEXT NOT NULL,

    CONSTRAINT "Store_location_pkey" PRIMARY KEY ("store_location_id")
);

-- CreateTable
CREATE TABLE "User_store_map" (
    "map_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "User_store_map_pkey" PRIMARY KEY ("map_id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Roles_permissions" (
    "map_id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "permissions_name" TEXT NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "Roles_permissions_pkey" PRIMARY KEY ("map_id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "permission_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "Store_category_maps" (
    "map_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "categories_id" INTEGER NOT NULL,

    CONSTRAINT "Store_category_maps_pkey" PRIMARY KEY ("map_id")
);

-- CreateTable
CREATE TABLE "Store_categories" (
    "categories_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_description" TEXT NOT NULL,

    CONSTRAINT "Store_categories_pkey" PRIMARY KEY ("categories_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_price" DOUBLE PRECISION NOT NULL,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Product_categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_description" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Product_categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Product_attribute" (
    "id_attribute" SERIAL NOT NULL,
    "name_attribute" TEXT NOT NULL,
    "attribute_value" TEXT[],
    "attribute_unite" TEXT[],
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Product_attribute_pkey" PRIMARY KEY ("id_attribute")
);

-- CreateTable
CREATE TABLE "Products_images" (
    "image_id" SERIAL NOT NULL,
    "product_image" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Products_images_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "Wish_list" (
    "wish_list_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wish_list_pkey" PRIMARY KEY ("wish_list_id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "stock_id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reserved_quantity" INTEGER NOT NULL,
    "sold_quantity" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "last_changed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("stock_id")
);

-- CreateTable
CREATE TABLE "Order_items" (
    "item_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price_at_purchase" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_items_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "accuracy" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Carts" (
    "cart_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carts_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "Cart_items" (
    "item_id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Cart_items_pkey" PRIMARY KEY ("item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_role_name_key" ON "Roles"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_name_key" ON "Permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_categories_category_name_key" ON "Store_categories"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_categories_product_id_key" ON "Product_categories"("product_id");

-- AddForeignKey
ALTER TABLE "Notifications_map_user" ADD CONSTRAINT "Notifications_map_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications_map_user" ADD CONSTRAINT "Notifications_map_user_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "Notifications"("notification_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings_and_reviews" ADD CONSTRAINT "Ratings_and_reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings_and_reviews" ADD CONSTRAINT "Ratings_and_reviews_reviewed_id_fkey" FOREIGN KEY ("reviewed_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings_and_reviews" ADD CONSTRAINT "Ratings_and_reviews_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store_location" ADD CONSTRAINT "Store_location_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store_location" ADD CONSTRAINT "Store_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_store_map" ADD CONSTRAINT "User_store_map_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_store_map" ADD CONSTRAINT "User_store_map_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_store_map" ADD CONSTRAINT "User_store_map_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles_permissions" ADD CONSTRAINT "Roles_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles_permissions" ADD CONSTRAINT "Roles_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permissions"("permission_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store_category_maps" ADD CONSTRAINT "Store_category_maps_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store_category_maps" ADD CONSTRAINT "Store_category_maps_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Store_categories"("categories_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_categories" ADD CONSTRAINT "Product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_attribute" ADD CONSTRAINT "Product_attribute_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products_images" ADD CONSTRAINT "Products_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wish_list" ADD CONSTRAINT "Wish_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wish_list" ADD CONSTRAINT "Wish_list_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_items" ADD CONSTRAINT "Order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_items" ADD CONSTRAINT "Order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_items" ADD CONSTRAINT "Cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Carts"("cart_id") ON DELETE RESTRICT ON UPDATE CASCADE;
