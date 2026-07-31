-- CreateEnum
CREATE TYPE "RouteType" AS ENUM ('SUBURBAN', 'CITY');

-- CreateEnum
CREATE TYPE "SeasonType" AS ENUM ('SUMMER', 'AUTUMN', 'WINTER', 'SPRING');

-- CreateEnum
CREATE TYPE "DepartureDirection" AS ENUM ('FROM_START', 'FROM_END');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "type" "SeasonType" NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonPeriod" (
    "id" SERIAL NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "startMonth" INTEGER NOT NULL,
    "startDay" INTEGER NOT NULL,
    "endMonth" INTEGER NOT NULL,
    "endDay" INTEGER NOT NULL,

    CONSTRAINT "SeasonPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RouteType" NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteDeparture" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "direction" "DepartureDirection" NOT NULL,
    "time" TEXT NOT NULL,
    "daysOfWeek" "DayOfWeek"[],
    "comment" TEXT,

    CONSTRAINT "RouteDeparture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Season_type_key" ON "Season"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Route_seasonId_type_number_key" ON "Route"("seasonId", "type", "number");

-- AddForeignKey
ALTER TABLE "SeasonPeriod" ADD CONSTRAINT "SeasonPeriod_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteDeparture" ADD CONSTRAINT "RouteDeparture_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
