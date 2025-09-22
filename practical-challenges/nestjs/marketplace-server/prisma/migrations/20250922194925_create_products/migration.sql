-- CreateTable
CREATE TABLE "public"."products" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "priceInCents" INTEGER NOT NULL,
    "attachmentsIds" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
