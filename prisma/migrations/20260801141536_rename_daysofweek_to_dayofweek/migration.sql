/*
  Warnings:

  - You are about to drop the column `daysOfWeek` on the `RouteDeparture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RouteDeparture" DROP COLUMN "daysOfWeek",
ADD COLUMN     "dayOfWeek" "DayOfWeek"[];
