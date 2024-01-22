/*
  Warnings:

  - You are about to drop the column `productId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - A unique constraint covering the columns `[username]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `carts_productId_fkey` ON `carts`;

-- AlterTable
ALTER TABLE `carts` DROP COLUMN `productId`,
    DROP COLUMN `quantity`,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `completedAt`,
    ADD COLUMN `totalAmount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `price` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `carts_username_key` ON `carts`(`username`);

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
