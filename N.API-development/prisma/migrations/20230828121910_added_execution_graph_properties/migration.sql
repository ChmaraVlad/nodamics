-- CreateTable
CREATE TABLE "ExecutionGridProperties" (
    "id" TEXT NOT NULL,
    "diagramId" TEXT NOT NULL,
    "gridColor" TEXT,
    "xAxisTitle" TEXT,

    CONSTRAINT "ExecutionGridProperties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExecutionGridProperties_diagramId_key" ON "ExecutionGridProperties"("diagramId");

-- AddForeignKey
ALTER TABLE "ExecutionGridProperties" ADD CONSTRAINT "ExecutionGridProperties_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
