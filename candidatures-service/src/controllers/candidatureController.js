const Candidature = require('../models/Candidature');

// POST: Créer une candidature
exports.createCandidature = async (req, res) => {
  try {
    const { offreId, lettreMotivation } = req.body;
    const newCandidature = new Candidature({
      offreId,
      candidatId: req.user.id,
      lettreMotivation
    });
    await newCandidature.save();
    
    // ➕ Ici tu peux publier l'event `candidature.created` à RabbitMQ
    
    res.status(201).json(newCandidature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Mes candidatures
exports.getMesCandidatures = async (req, res) => {
  try {
    const candidatures = await Candidature.find({ candidatId: req.user.id });
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Toutes les candidatures d’une offre
exports.getCandidaturesOffre = async (req, res) => {
  try {
    const candidatures = await Candidature.find({ offreId: req.params.offreId });
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT: Modifier le statut
exports.updateStatutCandidature = async (req, res) => {
  try {
    const { statut } = req.body;
    const candidature = await Candidature.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true }
    );

    // ➕ Ici tu peux publier l'event `candidature.updated` à RabbitMQ

    res.json(candidature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
