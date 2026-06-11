-- CreateEnum
CREATE TYPE "Category" AS ENUM ('NECKLACES', 'EARRINGS', 'BANGLES', 'RINGS', 'SETS', 'BRACELETS', 'CHAINS', 'PENDANTS', 'ANKLETS', 'CUSTOM_ORDERS');

-- CreateEnum
CREATE TYPE "Purity" AS ENUM ('K22_GOLD', 'K24_GOLD', 'K18_GOLD', 'SILVER', 'GOLD_PLATED', 'CUSTOM');

-- CreateEnum
CREATE TYPE "StoneType" AS ENUM ('EMERALD', 'RUBY', 'DIAMOND', 'PEARL', 'KUNDAN', 'NO_STONE', 'OTHER');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'HIDDEN', 'OUT_OF_STOCK', 'COMING_SOON');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "mainImage" TEXT,
    "purity" "Purity" NOT NULL DEFAULT 'K22_GOLD',
    "stoneType" "StoneType" NOT NULL DEFAULT 'EMERALD',
    "weight" DOUBLE PRECISION,
    "tags" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
