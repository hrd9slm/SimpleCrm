const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const Joi = require("joi");

const entrepriseController = {
  // afficher toutes les entreprises
  getAllEntreprises: async (req, res) => {
    try {
      const entreprises = await prisma.entreprise.findMany({
        include: {
          client: true,
          facture: true,
          fournisseur: true,
        },
      });
      res.json(entreprises);
    } catch (error) {
      res
        .status(500)
        .json({ error: "une erreura l affichage des entreprises" });
    }
  },

  // afficher une entreprise par son id
  getEntrepriseById: async (req, res) => {
    const { id } = req.params;
    try {
      const entreprise = await prisma.entreprise.findUnique({
        where: { id_entreprise: parseInt(id) },
        include: {
          client: true,
          facture: true,
          fournisseur: true,
        },
      });
      if (!entreprise) {
        return res
          .status(404)
          .json({ error: "aucune entreprise trouve avec cet id" });
      }
      res.json(entreprise);
    } catch (error) {
      res
        .status(500)
        .json({ error: "une erreur a l affichagede l entreprise" });
    }
  },

  // Creer une nouvelle entreprise
  createEntreprise: async (req, res) => {
    const {
      nom,
      siege_social,
      date_creation,
      identifiant_fiscal,
      capital,
      nombre_employes,
      ville,
      responsable,
      telephone,
      email,
    } = req.body;
    try {
      const newEntreprise = await prisma.entreprise.create({
        data: {
          nom,
          siege_social,
          date_creation: new Date(date_creation),
          identifiant_fiscal,
          capital,
          nombre_employes,
          ville,
          responsable,
          telephone,
          email,
        },
      });
      res.status(201).json(newEntreprise);
    } catch (error) {
      res
        .status(500)
        .json({ error: "une erreur a la creation de l entreprise" });
    }
  },

  // modifier entreprise
  updateEntreprise: async (req, res) => {
    const { id } = req.params;
    const {
      nom,
      siege_social,
      date_creation,
      identifiant_fiscal,
      capital,
      nombre_employes,
      ville,
      responsable,
      telephone,
      email,
    } = req.body;
    try {
      const updatedEntreprise = await prisma.entreprise.update({
        where: { id_entreprise: parseInt(id) },
        data: {
          nom,
          siege_social,
          date_creation: new Date(date_creation),
          identifiant_fiscal,
          capital,
          nombre_employes,
          ville,
          responsable,
          telephone,
          email,
        },
      });
      res.json({
        updatedEntreprise,
        message: "l entreprise a ete bien modifie",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "une erreur a la mise a jour de l entreprise" });
    }
  },

  // supprimer une entreprise
  deleteEntreprise: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.entreprise.delete({
        where: { id_entreprise: parseInt(id) },
      });
      res.json({ message: "entreprise a ete supprime avec succes" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "une erreur a la suppression de l entreprise" });
    }
  },
};
module.exports = entrepriseController;
