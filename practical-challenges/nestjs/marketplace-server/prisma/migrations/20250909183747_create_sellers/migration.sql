-- CreateTable
CREATE TABLE "public"."sellers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarId" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "sellers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sellers_phone_key" ON "public"."sellers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "sellers_email_key" ON "public"."sellers"("email");
