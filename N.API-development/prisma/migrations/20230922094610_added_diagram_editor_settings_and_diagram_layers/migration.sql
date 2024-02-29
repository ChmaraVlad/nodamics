-- CreateTable
CREATE TABLE "DiagramEditorSettings" (
    "id" TEXT NOT NULL,
    "diagramId" TEXT NOT NULL,

    CONSTRAINT "DiagramEditorSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagramLayers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "diagramEditorSettingsId" TEXT NOT NULL,

    CONSTRAINT "DiagramLayers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiagramEditorSettings_diagramId_key" ON "DiagramEditorSettings"("diagramId");

-- AddForeignKey
ALTER TABLE "DiagramEditorSettings" ADD CONSTRAINT "DiagramEditorSettings_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramLayers" ADD CONSTRAINT "DiagramLayers_diagramEditorSettingsId_fkey" FOREIGN KEY ("diagramEditorSettingsId") REFERENCES "DiagramEditorSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
