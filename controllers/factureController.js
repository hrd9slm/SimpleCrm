const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const factureController = {
  getAllFactures: async (req, res) => {
    try {
      const factures = await prisma.facture.findMany({
        include: {
          client: true, 
        }
      });
      res.json(factures);
    } catch (error) {
      res.status(500).json({ error: "une erreur a l affichage des factures." });
    }
  },
  
  getFactureById: async (req, res) => {
    const { id } = req.params;
    try {
      const facture = await prisma.facture.findUnique({
        where: {
          id_facture: parseInt(id),
        },
        include: {
          client: true, 
        }
      });
      res.json(facture);
    } catch (error) {
      res.status(500).json({ error: "une erreur a  l affichage de la facture." });
    }
  },

  createFacture: async (req, res) => {
    const { id_client, date_facture, montant_total, id_entreprise } = req.body;
     try {
       const newFacture = await prisma.facture.create({
         data: {
           id_client,
           date_facture:new Date(date_facture),
           montant_total,
           id_entreprise
         },
       });
       res.json({newFacture,message :"bien ete ajoute"});
     } catch (error) {
       res.status(500).json({ error: "une erreur dans la creation de la facture." });
     }
  },

  updateFacture: async (req, res) => {
    const { id } = req.params;
    const { id_client, date_facture, montant_total, id_entreprise } = req.body;
    try {
      const updatedFacture = await prisma.facture.update({
        where: {
          id_facture: parseInt(id),
        },
        data: {
          id_client,
          date_facture:new Date(date_facture),
          montant_total,
          id_entreprise
        },
      });
      res.json({updatedFacture,message:"bien ete modifie"});
    } catch (error) {
      res.status(500).json({ error: "une erreur au modification de la facture." });
    }
  },

  deleteFacture: async (req, res) => {
    const { id } = req.params;
     try {
       await prisma.facture.delete({
         where: {
           id_facture: parseInt(id),
         },
       });
       res.json({ message: "facture supprimee avec succes." });
     } catch (error) {
       res.status(500).json({ error: "une erreur a  la suppression de la facture." });
     }
  },
};

module.exports = factureController;
