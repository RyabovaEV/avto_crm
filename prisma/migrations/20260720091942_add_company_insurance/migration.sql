-- CreateTable
CREATE TABLE "CompanyInsurance" (
    "id" SERIAL NOT NULL,
    "insurer" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "dateBegin" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyInsurance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyInsurance_companyId_key" ON "CompanyInsurance"("companyId");

-- AddForeignKey
ALTER TABLE "CompanyInsurance" ADD CONSTRAINT "CompanyInsurance_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
