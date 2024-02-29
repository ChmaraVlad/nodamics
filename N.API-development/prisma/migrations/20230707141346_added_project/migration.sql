/*
  Warnings:

  - You are about to drop the `Dashboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Diagram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiagramOfDashboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagOfDashboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagOfDiagram` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dashboard" DROP CONSTRAINT "Dashboard_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Diagram" DROP CONSTRAINT "Diagram_userId_fkey";

-- DropForeignKey
ALTER TABLE "DiagramOfDashboard" DROP CONSTRAINT "DiagramOfDashboard_dashboardId_fkey";

-- DropForeignKey
ALTER TABLE "DiagramOfDashboard" DROP CONSTRAINT "DiagramOfDashboard_diagramId_fkey";

-- DropForeignKey
ALTER TABLE "TagOfDashboard" DROP CONSTRAINT "TagOfDashboard_dashboardId_fkey";

-- DropForeignKey
ALTER TABLE "TagOfDashboard" DROP CONSTRAINT "TagOfDashboard_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TagOfDiagram" DROP CONSTRAINT "TagOfDiagram_dashboardTagId_fkey";

-- DropForeignKey
ALTER TABLE "TagOfDiagram" DROP CONSTRAINT "TagOfDiagram_diagramId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;

-- DropTable
DROP TABLE "Dashboard";

-- DropTable
DROP TABLE "Diagram";

-- DropTable
DROP TABLE "DiagramOfDashboard";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "TagOfDashboard";

-- DropTable
DROP TABLE "TagOfDiagram";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "lastEditorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_lastEditorId_fkey" FOREIGN KEY ("lastEditorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
