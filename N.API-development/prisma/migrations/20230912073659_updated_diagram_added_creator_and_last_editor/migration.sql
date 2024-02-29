/*
  Warnings:

  - Added the required column `creatorId` to the `Diagram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastEditorId` to the `Diagram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diagram" ADD COLUMN     "creatorId" TEXT  NULL,
ADD COLUMN     "lastEditorId" TEXT  NULL;

-- AddForeignKey
ALTER TABLE "Diagram" ADD CONSTRAINT "Diagram_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagram" ADD CONSTRAINT "Diagram_lastEditorId_fkey" FOREIGN KEY ("lastEditorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
