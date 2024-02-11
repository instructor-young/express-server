/*
  Warnings:

  - You are about to drop the column `userId` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropIndex
DROP INDEX "Cart_userId_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
