-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summaryTotal" TEXT NOT NULL,
    "summaryTheory" TEXT NOT NULL,
    "summaryPractice" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramSection" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ProgramSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramSubject" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "theory" TEXT NOT NULL,
    "practice" TEXT NOT NULL,
    "exam" TEXT NOT NULL,

    CONSTRAINT "ProgramSubject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProgramSection" ADD CONSTRAINT "ProgramSection_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramSubject" ADD CONSTRAINT "ProgramSubject_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ProgramSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
