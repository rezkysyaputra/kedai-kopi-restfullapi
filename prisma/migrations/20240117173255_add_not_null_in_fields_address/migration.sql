/*
  Warnings:

  - Made the column `street` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `province` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `street` VARCHAR(255) NOT NULL,
    MODIFY `city` VARCHAR(100) NOT NULL,
    MODIFY `province` VARCHAR(100) NOT NULL;
