const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const produitController = {
    getAllProduits: async (req, res) => {
      try {
        const produits = await prisma.produit.findMany({
          include: {
            reapprovisionnement: true,
          },
        });
        res.json(produits);
      } catch (error) {
        res.status(500).json({ error: "Une erreur au affichage des produits." });
      }
    },
    
    getProduitById: async (req, res) => {
      const { id } = req.params;
      try {
        const produit = await prisma.produit.findUnique({
          where: {
            id_produit: parseInt(id),
          },
          include: {
            reapprovisionnement: true,
          },
        });
        res.json(produit);
      } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération du produit." });
      }
    },
  
    createProduit: async (req, res) => {
      const { nom, prix_achat, prix_vente, taux_marge, dimension, taille } = req.body;
      try {
        const newProduit = await prisma.produit.create({
          data: {
            nom,
            prix_achat,
            prix_vente,
            taux_marge,
            dimension,
            taille,
          },
        });
        res.json(newProduit);
      } catch (error) {
        res.status(500).json({ error: "Une erreur ai creation du produit." });
      }
    },
  
    updateProduit: async (req, res) => {
      const { id } = req.params;
      const { nom, prix_achat, prix_vente, taux_marge, dimension, taille } = req.body;
      try {
        const updatedProduit = await prisma.produit.update({
          where: {
            id_produit: parseInt(id),
          },
          data: {
            nom,
            prix_achat,
            prix_vente,
            taux_marge,
            dimension,
            taille,
          },
        });
        res.json(updatedProduit);
      } catch (error) {
        res.status(500).json({ error: "Une erreur au modification du produit." });
      }
    },
  
    deleteProduit: async (req, res) => {
      const { id } = req.params;
      try {
        await prisma.produit.delete({
          where: {
            id_produit: parseInt(id),
          },
        });
        res.json({ message: "Produit supprimé avec succès." });
      } catch (error) {
        res.status(500).json({ error: "Une erreur a la suppression du produit." });
      }
    },
  };
  
  module.exports = produitController;