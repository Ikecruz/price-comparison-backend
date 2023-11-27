-- CreateTable
CREATE TABLE `models` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cellular` VARCHAR(255) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `storage` VARCHAR(255) NOT NULL,
    `model_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comparisons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `price` FLOAT NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `phone_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `phones` ADD CONSTRAINT `phones_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `models`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comparisons` ADD CONSTRAINT `comparisons_phone_id_fkey` FOREIGN KEY (`phone_id`) REFERENCES `phones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
