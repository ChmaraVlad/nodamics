-- DropForeignKey
ALTER TABLE "ProjectTeam" DROP CONSTRAINT "ProjectTeam_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnProjectTeam" DROP CONSTRAINT "UserOnProjectTeam_projectTeamId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnProjectTeam" DROP CONSTRAINT "UserOnProjectTeam_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserOnProjectTeam" ADD CONSTRAINT "UserOnProjectTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnProjectTeam" ADD CONSTRAINT "UserOnProjectTeam_projectTeamId_fkey" FOREIGN KEY ("projectTeamId") REFERENCES "ProjectTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTeam" ADD CONSTRAINT "ProjectTeam_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
