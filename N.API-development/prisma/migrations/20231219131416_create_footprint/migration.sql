-- CreateTable
CREATE TABLE "FootprintSQLQuery" (
    "id" TEXT NOT NULL,
    "sqlQuery" TEXT NOT NULL,
    "diagramId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" JSONB,
    "projectId" TEXT,

    CONSTRAINT "FootprintSQLQuery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FootprintRequest" (
    "id" TEXT NOT NULL,
    "footprintSQLQueryId" TEXT NOT NULL,
    "executionId" TEXT NOT NULL,
    "lastRequestedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FootprintRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FootprintSQLQuery_sqlQuery_key" ON "FootprintSQLQuery"("sqlQuery");

-- AddForeignKey
ALTER TABLE "FootprintSQLQuery" ADD CONSTRAINT "FootprintSQLQuery_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FootprintSQLQuery" ADD CONSTRAINT "FootprintSQLQuery_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FootprintRequest" ADD CONSTRAINT "FootprintRequest_footprintSQLQueryId_fkey" FOREIGN KEY ("footprintSQLQueryId") REFERENCES "FootprintSQLQuery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
