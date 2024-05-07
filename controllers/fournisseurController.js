const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const fournisseurController = {
  getAllFournisseurs: async (req, res) => {
    try {
      const fournisseurs = await prisma.fournisseur.findMany({
        include: {
          reapprovisionnement: true 
        }
      });
      res.json(fournisseurs);
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue lors de la récupération des fournisseurs." });
    }
  },
  
  getFournisseurById: async (req, res) => {
    const { id } = req.params;
    try {
      const fournisseur = await prisma.fournisseur.findUnique({
        where: {
          id_fournisseur: parseInt(id),
        },
        include: {
          reapprovisionnement: true 
        }
      });
      res.json(fournisseur);
    } catch (error) {
      res.status(500).json({ error: "Une erreur a l affichage du fournisseur." });
    }
  },

  createFournisseur: async (req, res) => {
    const { id_entreprise,nom, adresse, ville, telephone, email } = req.body;
    try {
      const newFournisseur = await prisma.fournisseur.create({
        data: {
          id_entreprise,
          nom,
          adresse,
          ville,
          telephone,
          email,
        },
      });
      res.json(newFournisseur);
    } catch (error) {
      res.status(500).json({ error: "Une erreur a la creation du fournisseur." });
    }
  },

  updateFournisseur: async (req, res) => {
    const { id } = req.params;
    const {id_entreprise, nom, adresse, ville, telephone, email } = req.body;
    try {
      const updatedFournisseur = await prisma.fournisseur.update({
        where: {
          id_fournisseur: parseInt(id),
        },
        data: {
          id_entreprise,
          nom,
          adresse,
          ville,
          telephone,
          email,
        },
      });
      res.json(updatedFournisseur);
    } catch (error) {
      res.status(500).json({ error: "Une erreur a la modification du fournisseur." });
    }
  },

  deleteFournisseur: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.fournisseur.delete({
        where: {
          id_fournisseur: parseInt(id),
        },
      });
      res.json({ message: "Fournisseur supprimé avec succès." });
    } catch (error) {
      res.status(500).json({ error: "Une erreur a la suppression du fournisseur." });
    }
  },
};

module.exports = fournisseurController;
