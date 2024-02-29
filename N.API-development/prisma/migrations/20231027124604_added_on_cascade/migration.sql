-- DropForeignKey
ALTER TABLE "DiagramEditorSettings" DROP CONSTRAINT "DiagramEditorSettings_diagramId_fkey";

-- DropForeignKey
ALTER TABLE "DiagramLayers" DROP CONSTRAINT "DiagramLayers_diagramEditorSettingsId_fkey";

-- DropForeignKey
ALTER TABLE "ExecutionGridProperties" DROP CONSTRAINT "ExecutionGridProperties_diagramId_fkey";

-- AddForeignKey
ALTER TABLE "ExecutionGridProperties" ADD CONSTRAINT "ExecutionGridProperties_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramEditorSettings" ADD CONSTRAINT "DiagramEditorSettings_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramLayers" ADD CONSTRAINT "DiagramLayers_diagramEditorSettingsId_fkey" FOREIGN KEY ("diagramEditorSettingsId") REFERENCES "DiagramEditorSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
