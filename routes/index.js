const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
 const fournisseurController = require('../controllers/fournisseurController');
 const produitController = require('../controllers/produitController');
 const factureController = require('../controllers/factureController');
 const entrepriseController = require('../controllers/entrepriseController');


// Routes pour les clients
 router.get('/clients', clientController.getAllClients);
 router.get('/clients/:id', clientController.getClientById);
 router.post('/clients', clientController.createClient);
 router.put('/clients/:id', clientController.updateClient);
 router.delete('/clients/:id', clientController.deleteClient);

//  Routes pour les entreprises
router.get('/entreprises', entrepriseController.getAllEntreprises);
router.get('/entreprises/:id', entrepriseController.getEntrepriseById);
router.post('/entreprises', entrepriseController.createEntreprise);
router.put('/entreprises/:id', entrepriseController.updateEntreprise);
router.delete('/entreprises/:id', entrepriseController.deleteEntreprise);



// Routes pour les fournisseurs
 router.get('/fournisseurs', fournisseurController.getAllFournisseurs);
 router.get('/fournisseurs/:id', fournisseurController.getFournisseurById);
 router.post('/fournisseurs', fournisseurController.createFournisseur);
 router.put('/fournisseurs/:id', fournisseurController.updateFournisseur);
 router.delete('/fournisseurs/:id', fournisseurController.deleteFournisseur);



// Routes pour les produits
 router.get('/produits', produitController.getAllProduits);
 router.get('/produits/:id', produitController.getProduitById);
 router.post('/produits', produitController.createProduit);
 router.put('/produits/:id', produitController.updateProduit);
 router.delete('/produits/:id', produitController.deleteProduit);


// Routes pour les factures
 router.get('/factures', factureController.getAllFactures);
 router.get('/factures/:id', factureController.getFactureById);
 router.post('/factures', factureController.createFacture);
 router.put('/factures/:id', factureController.updateFacture);
 router.delete('/factures/:id', factureController.deleteFacture);





module.exports = router;
