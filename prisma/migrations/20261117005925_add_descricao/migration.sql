/*
  Warnings:

  - You are about to drop the column `descricao` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `produtos` DROP COLUMN `descricao`,
    ADD COLUMN `discricao` VARCHAR(255) NULL;
