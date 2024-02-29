-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aiHelperId" TEXT[];

-- CreateTable
CREATE TABLE "AiHelperMessage" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "aiHelperId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiHelperMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiHelper" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiHelper_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AiHelperMessage" ADD CONSTRAINT "AiHelperMessage_aiHelperId_fkey" FOREIGN KEY ("aiHelperId") REFERENCES "AiHelper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
