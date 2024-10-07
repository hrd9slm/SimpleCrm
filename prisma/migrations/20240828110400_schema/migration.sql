-- CreateTable
CREATE TABLE `client` (
    `id_client` INTEGER NOT NULL AUTO_INCREMENT,
    `id_entreprise` INTEGER NULL,
    `nom` VARCHAR(255) NOT NULL,
    `prenom` VARCHAR(255) NULL,
    `adresse` VARCHAR(255) NULL,
    `ville` VARCHAR(255) NULL,
    `telephone` VARCHAR(20) NULL,
    `email` VARCHAR(255) NULL,

    INDEX `id_entreprise`(`id_entreprise`),
    PRIMARY KEY (`id_client`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entreprise` (
    `id_entreprise` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `siege_social` VARCHAR(255) NULL,
    `date_creation` DATE NULL,
    `identifiant_fiscal` VARCHAR(255) NULL,
    `capital` DECIMAL(15, 2) NULL,
    `nombre_employes` INTEGER NULL,
    `ville` VARCHAR(255) NULL,
    `responsable` VARCHAR(255) NULL,
    `telephone` VARCHAR(20) NULL,
    `email` VARCHAR(255) NULL,

    PRIMARY KEY (`id_entreprise`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facture` (
    `id_facture` INTEGER NOT NULL AUTO_INCREMENT,
    `id_client` INTEGER NULL,
    `date_facture` DATE NULL,
    `montant_total` DECIMAL(15, 2) NULL,
    `id_entreprise` INTEGER NULL,

    INDEX `fk_entreprise_facture`(`id_entreprise`),
    INDEX `id_client`(`id_client`),
    PRIMARY KEY (`id_facture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fournisseur` (
    `id_fournisseur` INTEGER NOT NULL AUTO_INCREMENT,
    `id_entreprise` INTEGER NULL,
    `nom` VARCHAR(255) NOT NULL,
    `adresse` VARCHAR(255) NULL,
    `ville` VARCHAR(255) NULL,
    `telephone` VARCHAR(20) NULL,
    `email` VARCHAR(255) NULL,

    INDEX `id_entreprise`(`id_entreprise`),
    PRIMARY KEY (`id_fournisseur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produit` (
    `id_produit` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `prix_achat` DECIMAL(15, 2) NULL,
    `prix_vente` DECIMAL(15, 2) NULL,
    `taux_marge` DECIMAL(5, 2) NULL,
    `dimension` VARCHAR(255) NULL,
    `taille` VARCHAR(255) NULL,

    PRIMARY KEY (`id_produit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produit_facture` (
    `id_produit_facture` INTEGER NOT NULL AUTO_INCREMENT,
    `id_facture` INTEGER NULL,
    `id_produit` INTEGER NULL,
    `quantite` INTEGER NULL,
    `prix_unitaire` DECIMAL(15, 2) NULL,

    INDEX `id_facture`(`id_facture`),
    INDEX `id_produit`(`id_produit`),
    PRIMARY KEY (`id_produit_facture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reapprovisionnement` (
    `id_reappro` INTEGER NOT NULL AUTO_INCREMENT,
    `id_fournisseur` INTEGER NULL,
    `id_produit` INTEGER NULL,
    `quantite` INTEGER NULL,
    `date_reappro` DATE NULL,

    INDEX `id_fournisseur`(`id_fournisseur`),
    INDEX `id_produit`(`id_produit`),
    PRIMARY KEY (`id_reappro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `client` ADD CONSTRAINT `client_ibfk_1` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise`(`id_entreprise`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `facture` ADD CONSTRAINT `facture_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client`(`id_client`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `facture` ADD CONSTRAINT `fk_entreprise_facture` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise`(`id_entreprise`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `fournisseur` ADD CONSTRAINT `fournisseur_ibfk_1` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise`(`id_entreprise`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produit_facture` ADD CONSTRAINT `produit_facture_ibfk_1` FOREIGN KEY (`id_facture`) REFERENCES `facture`(`id_facture`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produit_facture` ADD CONSTRAINT `produit_facture_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produit`(`id_produit`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reapprovisionnement` ADD CONSTRAINT `reapprovisionnement_ibfk_1` FOREIGN KEY (`id_fournisseur`) REFERENCES `fournisseur`(`id_fournisseur`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reapprovisionnement` ADD CONSTRAINT `reapprovisionnement_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produit`(`id_produit`) ON DELETE RESTRICT ON UPDATE RESTRICT;
