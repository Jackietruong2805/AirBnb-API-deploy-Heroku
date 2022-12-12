/*
  Warnings:

  - You are about to drop the `binhluan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `datphong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nguoidung` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `phong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vitri` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `binhluan` DROP FOREIGN KEY `BinhLuan_ibfk_1`;

-- DropForeignKey
ALTER TABLE `binhluan` DROP FOREIGN KEY `BinhLuan_ibfk_2`;

-- DropForeignKey
ALTER TABLE `datphong` DROP FOREIGN KEY `DatPhong_ibfk_1`;

-- DropForeignKey
ALTER TABLE `datphong` DROP FOREIGN KEY `DatPhong_ibfk_2`;

-- DropForeignKey
ALTER TABLE `phong` DROP FOREIGN KEY `Phong_ibfk_1`;

-- DropTable
DROP TABLE `binhluan`;

-- DropTable
DROP TABLE `datphong`;

-- DropTable
DROP TABLE `nguoidung`;

-- DropTable
DROP TABLE `phong`;

-- DropTable
DROP TABLE `vitri`;

-- CreateTable
CREATE TABLE `BinhLuan` (
    `id_nguoidung` INTEGER NOT NULL,
    `id_phong` INTEGER NOT NULL,
    `ngay_binh_luan` VARCHAR(255) NOT NULL,
    `noi_dung` VARCHAR(255) NULL,
    `sao_binh_luan` INTEGER NULL,

    INDEX `id_phong`(`id_phong`),
    PRIMARY KEY (`id_nguoidung`, `id_phong`, `ngay_binh_luan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DatPhong` (
    `id_nguoidung` INTEGER NOT NULL,
    `id_phong` INTEGER NOT NULL,
    `ngay_den` DATE NULL,
    `ngay_di` DATE NULL,
    `so_luong_khach` INTEGER NULL,
    `ma_nguoi_dat` INTEGER NULL,

    INDEX `id_phong`(`id_phong`),
    PRIMARY KEY (`id_nguoidung`, `id_phong`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NguoiDung` (
    `id_nguoidung` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `pass_word` VARCHAR(255) NULL,
    `phone` VARCHAR(10) NULL,
    `birth_day` VARCHAR(20) NULL,
    `gender` VARCHAR(10) NULL,
    `role` VARCHAR(50) NULL,

    PRIMARY KEY (`id_nguoidung`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Phong` (
    `id_phong` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_phong` VARCHAR(255) NULL,
    `khach` INTEGER NULL,
    `phong_ngu` INTEGER NULL,
    `giuong` INTEGER NULL,
    `phong_tam` INTEGER NULL,
    `mo_ta` VARCHAR(255) NULL,
    `gia_tien` INTEGER NULL,
    `may_giat` BOOLEAN NULL,
    `ban_la` BOOLEAN NULL,
    `tivi` BOOLEAN NULL,
    `dieu_hoa` BOOLEAN NULL,
    `wifi` BOOLEAN NULL,
    `bep` BOOLEAN NULL,
    `do_xe` BOOLEAN NULL,
    `ho_boi` BOOLEAN NULL,
    `ban_ui` BOOLEAN NULL,
    `hinh_anh` VARCHAR(500) NULL,
    `id_vitri` INTEGER NULL,

    INDEX `id_vitri`(`id_vitri`),
    PRIMARY KEY (`id_phong`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViTri` (
    `id_vitri` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_vi_tri` VARCHAR(255) NULL,
    `tinh_thanh` VARCHAR(255) NULL,
    `quoc_gia` VARCHAR(255) NULL,
    `hinh_anh` VARCHAR(500) NULL,

    PRIMARY KEY (`id_vitri`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BinhLuan` ADD CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`id_nguoidung`) REFERENCES `NguoiDung`(`id_nguoidung`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `BinhLuan` ADD CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`id_phong`) REFERENCES `Phong`(`id_phong`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DatPhong` ADD CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`id_nguoidung`) REFERENCES `NguoiDung`(`id_nguoidung`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DatPhong` ADD CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`id_phong`) REFERENCES `Phong`(`id_phong`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Phong` ADD CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`id_vitri`) REFERENCES `ViTri`(`id_vitri`) ON DELETE NO ACTION ON UPDATE NO ACTION;
