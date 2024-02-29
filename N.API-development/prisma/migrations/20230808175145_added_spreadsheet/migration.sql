-- CreateTable
CREATE TABLE "Spreadsheet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "Spreadsheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpreadsheetColumn" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sheetId" TEXT NOT NULL,

    CONSTRAINT "SpreadsheetColumn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpreadsheetRow" (
    "id" TEXT NOT NULL,
    "sheetId" TEXT NOT NULL,

    CONSTRAINT "SpreadsheetRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpreadsheetValue" (
    "id" TEXT NOT NULL,
    "columnId" TEXT,
    "rowId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpreadsheetValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpreadsheetValue_columnId_rowId_key" ON "SpreadsheetValue"("columnId", "rowId");

-- AddForeignKey
ALTER TABLE "Spreadsheet" ADD CONSTRAINT "Spreadsheet_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpreadsheetColumn" ADD CONSTRAINT "SpreadsheetColumn_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Spreadsheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpreadsheetRow" ADD CONSTRAINT "SpreadsheetRow_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Spreadsheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpreadsheetValue" ADD CONSTRAINT "SpreadsheetValue_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "SpreadsheetColumn"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpreadsheetValue" ADD CONSTRAINT "SpreadsheetValue_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "SpreadsheetRow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
