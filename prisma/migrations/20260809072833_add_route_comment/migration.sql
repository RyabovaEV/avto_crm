-- CreateTable
CREATE TABLE "RouteComment" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "times" TEXT[],

    CONSTRAINT "RouteComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RouteComment" ADD CONSTRAINT "RouteComment_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
