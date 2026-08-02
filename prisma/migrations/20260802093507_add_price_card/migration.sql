-- CreateEnum
CREATE TYPE "PriceListType" AS ENUM ('BASE', 'DANGEROUS_GOODS');

-- CreateTable
CREATE TABLE "PriceCard" (
    "id" SERIAL NOT NULL,
    "type" "PriceListType" NOT NULL,
    "description" TEXT NOT NULL,
    "note" TEXT,
    "price" TEXT NOT NULL,
    "termOfStudy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceCard_pkey" PRIMARY KEY ("id")
);
