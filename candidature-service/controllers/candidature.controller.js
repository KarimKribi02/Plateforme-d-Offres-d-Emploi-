const Candidature = require('../models/candidature.model');

const axios = require('axios');

exports.create = async (req, res) => {
  try {
    const { offreId, message } = req.body;

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
    res.status(201).json(candidature);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la candidature." });
  }
};


exports.myCandidatures = async (req, res) => {
  const candidatId = req.user?.id || req.query.candidatId;

  if (!candidatId) {
    return res.status(400).json({ message: "candidatId requis ou token JWT." });
  }

  const candidatures = await Candidature.find({ candidatId });
  res.json(candidatures);
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

    res.json({ message: "Statut mis à jour.", candidature });
  } catch (error) {
    console.error("Erreur mise à jour statut :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
