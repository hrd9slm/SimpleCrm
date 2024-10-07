const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Joi = require('joi');

const clientController = {
  // afficher tous les clients
  getAllClients: async (req, res) => {
    try {
      const clients = await prisma.client.findMany({
        include: {
          facture: true 
        }
      });
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur de l affichage des clients' });
    }
  },

  // afficher un client par id
  getClientById: async (req, res) => {
    const { id } = req.params;
    try {
      const client = await prisma.client.findUnique({
        where: { id_client: parseInt(id)}, 
          
        include: {
          facture: true
        } 
      });
      if (client) {
        res.json(client);
      } else {
        res.status(404).json({ error: 'Client non trouvé.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Une erreur de l affichage du client.' });
    }
  },

  // creer un  client
  createClient: async (req, res) => {

     const { nom, prenom, adresse, ville, telephone, email, id_entreprise } = req.body;
     try {
        const schema = Joi.object({
            nom: Joi.string().trim()
                .min(3)
                .max(30)
                .required(),
            prenom: Joi.string().trim()
                .min(3)
                .max(30)
                .required(),
            adresse: Joi.string().trim()
                .min(10)
                .max(60)
                .required(),
            telephone: Joi.string().trim()
                .alphanum()
                .min(10)
                .max(10)
                .required(),
            ville: Joi.string().trim()
                .min(3)
                .max(10)
                .required(),
            email: Joi.string().trim()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }})
                .required(),
            id_entreprise:  Joi.number()
                .integer()
                .required(),})
                
       const {error}=schema.validate(req.body);
       if(error){
        return res.status(400).json(error.details[0].message);
       }
       const newClient = await prisma.client.create({
         data: {
           nom,
           prenom,
           adresse,
           ville,
           telephone,
           email,
           id_entreprise: parseInt(id_entreprise)
         }
       });
       res.status(201).json({newClient,message :"Client bien ete creer"});
     } catch (error) {
       res.status(500).json({ error: 'Une erreur  de la creation du client.' });
     }
  },

  // modiifier un client
  updateClient: async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, adresse, ville, telephone, email, id_entreprise } = req.body;
    try {
        const schema = Joi.object({
            nom: Joi.string().required().trim()
                .min(3)
                .max(30)
                ,
            prenom: Joi.string().trim()
                .min(3)
                .max(30)
                .required(),
            adresse: Joi.string().trim()
                .min(10)
                .max(60)
                .required(),
            telephone: Joi.string().trim()
                .alphanum()
                .min(10)
                .max(10)
                .required(),
            ville: Joi.string().trim()
                .min(3)
                .max(10)
                .required(),
            email: Joi.string().trim()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }})
                .required(),
            id_entreprise:  Joi.number()
                .integer()
                .required(),})
                
       const {error}=schema.validate(req.body);
       if(error){
        return res.status(400).json(error);
       }

      const updatedClient = await prisma.client.update({
        where: { id_client: parseInt(id) },
        data: {
          nom,
          prenom,
          adresse,
          ville,
          telephone,
          email,
          id_entreprise: parseInt(id_entreprise)
        }
      });
      res.json({updatedClient,message:"Client a ete mise a jour"});
    } catch (error) {
      res.status(500).json({ error: 'Une erreur  de la mise a jour du client.' });
    }
  },

  // Supprimer un client
  deleteClient: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.client.delete({
        where: { id_client: parseInt(id) }
      });
      res.json({ message: 'Client supprime avec succes.' });
    } catch (error) {
      res.status(500).json({ error: 'Une erreur  de la suppression du client.' });
    }
  }
};

module.exports = clientController;
