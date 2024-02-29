/*
  Warnings:

  - You are about to drop the `UserOnProjectTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnProjectTeam" DROP CONSTRAINT "UserOnProjectTeam_projectTeamId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnProjectTeam" DROP CONSTRAINT "UserOnProjectTeam_userId_fkey";

-- DropTable
DROP TABLE "UserOnProjectTeam";

-- CreateTable
CREATE TABLE "ProjectTeamMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectTeamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTeamMember_userId_projectTeamId_key" ON "ProjectTeamMember"("userId", "projectTeamId");

-- AddForeignKey
ALTER TABLE "ProjectTeamMember" ADD CONSTRAINT "ProjectTeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTeamMember" ADD CONSTRAINT "ProjectTeamMember_projectTeamId_fkey" FOREIGN KEY ("projectTeamId") REFERENCES "ProjectTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
