/*
  Warnings:

  - You are about to drop the `PriceCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Program` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgramSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgramSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProgramSection" DROP CONSTRAINT "ProgramSection_programId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramSubject" DROP CONSTRAINT "ProgramSubject_sectionId_fkey";

-- DropTable
DROP TABLE "PriceCard";

-- DropTable
DROP TABLE "Program";

-- DropTable
DROP TABLE "ProgramSection";

-- DropTable
DROP TABLE "ProgramSubject";

-- DropEnum
DROP TYPE "PriceListType";
