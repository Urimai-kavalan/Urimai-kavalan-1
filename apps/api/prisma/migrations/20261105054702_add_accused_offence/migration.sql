-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CITIZEN', 'FAMILY', 'PLV', 'LAWYER', 'DLSA', 'SLSA', 'PRISON_OFFICER', 'LEGAL_REVIEWER', 'SYS_ADMIN');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('NEW', 'INTAKE_INCOMPLETE', 'PENDING_VERIFICATION', 'PENDING_ASSIGNMENT', 'ASSIGNED', 'UNDER_REVIEW', 'CLOSED');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('UNREAD', 'READ');

-- CreateEnum
CREATE TYPE "LawAct" AS ENUM ('BNS', 'IPC', 'SPECIAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "passwordHash" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CITIZEN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "districtId" TEXT,
    "languagePref" TEXT NOT NULL DEFAULT 'ta',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "cnrNumber" TEXT,
    "firNumber" TEXT,
    "policeStation" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "status" "CaseStatus" NOT NULL DEFAULT 'NEW',
    "chargesheetFiledOn" TIMESTAMP(3),
    "familyId" TEXT NOT NULL,
    "assignedLawyerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accused" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "custodyStartDate" TIMESTAMP(3),
    "isFirstTimeOffender" BOOLEAN,
    "otherPendingCases" BOOLEAN NOT NULL DEFAULT false,
    "dataVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accused_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offence" (
    "id" TEXT NOT NULL,
    "accusedId" TEXT NOT NULL,
    "act" "LawAct" NOT NULL,
    "section" TEXT NOT NULL,
    "isBailable" BOOLEAN,
    "maxSentenceYears" DOUBLE PRECISION,
    "punishableWithDeathOrLife" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Offence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "ocrConfidence" DOUBLE PRECISION,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseEvent" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'UNREAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Accused_caseId_key" ON "Accused"("caseId");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_assignedLawyerId_fkey" FOREIGN KEY ("assignedLawyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accused" ADD CONSTRAINT "Accused_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offence" ADD CONSTRAINT "Offence_accusedId_fkey" FOREIGN KEY ("accusedId") REFERENCES "Accused"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseEvent" ADD CONSTRAINT "CaseEvent_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseEvent" ADD CONSTRAINT "CaseEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
