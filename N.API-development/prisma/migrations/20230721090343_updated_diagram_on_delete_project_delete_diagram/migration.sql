-- DropForeignKey
ALTER TABLE "Diagram" DROP CONSTRAINT "Diagram_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Diagram" ADD CONSTRAINT "Diagram_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
