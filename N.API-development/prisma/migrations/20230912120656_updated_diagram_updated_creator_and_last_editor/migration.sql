-- DropForeignKey
ALTER TABLE "Diagram" DROP CONSTRAINT "Diagram_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Diagram" DROP CONSTRAINT "Diagram_lastEditorId_fkey";

-- AlterTable
ALTER TABLE "Diagram" ALTER COLUMN "creatorId" DROP NOT NULL,
ALTER COLUMN "lastEditorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Diagram" ADD CONSTRAINT "Diagram_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagram" ADD CONSTRAINT "Diagram_lastEditorId_fkey" FOREIGN KEY ("lastEditorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
