-- DropForeignKey
ALTER TABLE "SpreadsheetColumn" DROP CONSTRAINT "SpreadsheetColumn_sheetId_fkey";

-- DropForeignKey
ALTER TABLE "SpreadsheetRow" DROP CONSTRAINT "SpreadsheetRow_sheetId_fkey";

-- DropForeignKey
ALTER TABLE "SpreadsheetValue" DROP CONSTRAINT "SpreadsheetValue_columnId_fkey";

-- DropForeignKey
ALTER TABLE "SpreadsheetValue" DROP CONSTRAINT "SpreadsheetValue_rowId_fkey";

-- AddForeignKey
ALTER TABLE "SpreadsheetColumn" ADD CONSTRAINT "SpreadsheetColumn_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Spreadsheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpreadsheetRow" ADD CONSTRAINT "SpreadsheetRow_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Spreadsheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpreadsheetValue" ADD CONSTRAINT "SpreadsheetValue_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "SpreadsheetColumn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpreadsheetValue" ADD CONSTRAINT "SpreadsheetValue_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "SpreadsheetRow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
