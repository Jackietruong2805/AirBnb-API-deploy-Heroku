-- CreateTable
CREATE TABLE `binhluan` (
    `id_nguoidung` INTEGER NOT NULL,
    `id_phong` INTEGER NOT NULL,
    `ngay_binh_luan` VARCHAR(255) NOT NULL,
    `noi_dung` VARCHAR(255) NULL,
    `sao_binh_luan` INTEGER NULL,

    INDEX `id_phong`(`id_phong`),
    PRIMARY KEY (`id_nguoidung`, `id_phong`, `ngay_binh_luan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `datphong` (
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
CREATE TABLE `nguoidung` (
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
CREATE TABLE `phong` (
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
CREATE TABLE `vitri` (
    `id_vitri` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_vi_tri` VARCHAR(255) NULL,
    `tinh_thanh` VARCHAR(255) NULL,
    `quoc_gia` VARCHAR(255) NULL,
    `hinh_anh` VARCHAR(500) NULL,

    PRIMARY KEY (`id_vitri`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `binhluan` ADD CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`id_nguoidung`) REFERENCES `nguoidung`(`id_nguoidung`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `binhluan` ADD CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`id_phong`) REFERENCES `phong`(`id_phong`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `datphong` ADD CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`id_nguoidung`) REFERENCES `nguoidung`(`id_nguoidung`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `datphong` ADD CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`id_phong`) REFERENCES `phong`(`id_phong`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phong` ADD CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`id_vitri`) REFERENCES `vitri`(`id_vitri`) ON DELETE NO ACTION ON UPDATE NO ACTION;
