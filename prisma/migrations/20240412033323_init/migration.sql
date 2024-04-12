-- CreateTable
CREATE TABLE `tb_task` (
    `id_task` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_task` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_task`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
