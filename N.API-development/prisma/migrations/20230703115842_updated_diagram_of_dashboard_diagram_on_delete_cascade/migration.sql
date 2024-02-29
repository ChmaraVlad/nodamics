-- DropForeignKey
ALTER TABLE "DiagramOfDashboard" DROP CONSTRAINT "DiagramOfDashboard_diagramId_fkey";

-- AddForeignKey
ALTER TABLE "DiagramOfDashboard" ADD CONSTRAINT "DiagramOfDashboard_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
