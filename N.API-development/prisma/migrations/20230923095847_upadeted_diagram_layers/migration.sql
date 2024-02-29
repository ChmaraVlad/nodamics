/*
  Warnings:

  - Added the required column `isSelected` to the `DiagramLayers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visible` to the `DiagramLayers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiagramLayers" ADD COLUMN     "isSelected" BOOLEAN NOT NULL,
ADD COLUMN     "visible" BOOLEAN NOT NULL;
