const Candidature = require('../models/candidature.model');
const axios = require('axios');
const { publishCandidatureCreated, publishCandidatureUpdated } = require('../utils/rabbitmq');

exports.create = async (req, res) => {
  try {
    // Vérification que l'utilisateur est bien un candidat
    if (req.user.role !== 'candidat') {
      return res.status(403).json({ 
        message: 'Accès refusé. Seuls les candidats peuvent créer des candidatures.' 
      });
    }
    
    const { offreId, message } = req.body;

    // Vérification si le candidat a déjà postulé à cette offre
    const candidatureExistante = await Candidature.findOne({
      offreId: offreId,
      candidatId: req.user.id
    });

    if (candidatureExistante) {
      return res.status(400).json({ 
        message: "Vous avez déjà postulé à cette offre.",
        candidature: candidatureExistante 
      });
    }

    // Vérifie que l'offre existe dans le service Laravel
    const offreResponse = await axios.get(`http://localhost:8000/api/offres/${offreId}`);

    if (!offreResponse.data) {
      return res.status(404).json({ message: "Offre introuvable." });
    }

    const candidature = new Candidature({
      offreId,
      message,
      candidatId: req.user.id,
      statut: "en attente"
    });
    
    await candidature.save();
    
    // Publish event for notification service
    publishCandidatureCreated({
      id: candidature._id,
      offreId,
      message,
      candidatId: req.user.id,
      statut: "en attente",
      entrepriseId: offreResponse.data.entreprise_id
    });
    
    res.status(201).json(candidature);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la candidature." });
  }
};

exports.myCandidatures = async (req, res) => {
  try {
    // Vérification que l'utilisateur est bien un candidat
    if (req.user.role !== 'candidat') {
      return res.status(403).json({ 
        message: 'Accès refusé. Seuls les candidats peuvent consulter leurs candidatures.' 
      });
    }

    const candidatId = req.user.id;

    if (!candidatId) {
      return res.status(400).json({ message: "Impossible d'identifier le candidat." });
    }

    const candidatures = await Candidature.find({ candidatId });
    
    if (candidatures.length === 0) {
      return res.status(200).json({ 
        message: "Vous n'avez pas encore postulé à des offres.",
        candidatures: [] 
      });
    }
    
    res.status(200).json(candidatures);
  } catch (error) {
    console.error("Erreur lors de la récupération des candidatures:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des candidatures." });
  }
};

exports.updateStatut = async (req, res) => {
  try {
    // Vérification que l'utilisateur est recruteur
    if (req.user.role !== 'recruteur') {
      return res.status(403).json({ message: 'Accès refusé. Seuls les recruteurs peuvent changer le statut.' });
    }

    const { id } = req.params;
    const { statut } = req.body;

    const candidature = await Candidature.findById(id);

    if (!candidature) {
      return res.status(404).json({ message: "Candidature introuvable." });
    }

    candidature.statut = statut;
    await candidature.save();
    
    // Publish event for notification service
    publishCandidatureUpdated({
      id: candidature._id,
      offreId: candidature.offreId,
      candidatId: candidature.candidatId,
      statut: statut,
      updatedBy: req.user.id
    });

    res.json({ message: "Statut mis à jour.", candidature });
  } catch (error) {
    console.error("Erreur mise à jour statut :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
