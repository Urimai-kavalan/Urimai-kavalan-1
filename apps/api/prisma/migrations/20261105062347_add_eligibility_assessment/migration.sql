-- CreateEnum
CREATE TYPE "ReviewDecision" AS ENUM ('CONFIRMED', 'OVERRIDDEN');

-- CreateTable
CREATE TABLE "EligibilityAssessment" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "rulesetVersion" TEXT NOT NULL,
    "overall" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "inputSnapshot" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewerId" TEXT,
    "reviewDecision" "ReviewDecision",
    "reviewedAt" TIMESTAMP(3),
    "reviewNote" TEXT,
    "overrideOverall" TEXT,

    CONSTRAINT "EligibilityAssessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EligibilityAssessment" ADD CONSTRAINT "EligibilityAssessment_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityAssessment" ADD CONSTRAINT "EligibilityAssessment_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
