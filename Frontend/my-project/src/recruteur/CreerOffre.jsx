import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const CreerOffre = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type_contrat: '',
    localisation: '',
    secteur: '',
    date_limite: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const offreData = {
        ...formData,
        entreprise_id: 1, // temporaire, à rendre dynamique plus tard
      };

      await axios.post('http://127.0.0.1:8000/api/offres', offreData);

      navigate('/recruteur/mes-offres');
    } catch (err) {
      setError("Erreur lors de la publication de l'offre.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold mb-6 text-center text-violet-700">Créer une offre de stage</h2>

      {error && (
        <div className="text-red-600 text-center mb-4 font-medium">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
        {/* Titre */}
        <div>
          <label htmlFor="titre" className="block text-sm font-medium text-gray-800">Titre de l'offre</label>
          <input
            type="text"
            id="titre"
            value={formData.titre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-800">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            required
          />
        </div>

        {/* Type de contrat */}
        <div>
          <label htmlFor="type_contrat" className="block text-sm font-medium text-gray-800">Type de contrat</label>
          <input
            type="text"
            id="type_contrat"
            value={formData.type_contrat}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            placeholder="Ex: CDI, CDD, Stage"
            required
          />
        </div>

        {/* Localisation */}
        <div>
          <label htmlFor="localisation" className="block text-sm font-medium text-gray-800">Localisation</label>
          <input
            type="text"
            id="localisation"
            value={formData.localisation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            placeholder="Ex: Casablanca"
            required
          />
        </div>

        {/* Secteur */}
        <div>
          <label htmlFor="secteur" className="block text-sm font-medium text-gray-800">Secteur d'activité</label>
          <input
            type="text"
            id="secteur"
            value={formData.secteur}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            placeholder="Informatique, Finance, etc."
            required
          />
        </div>

        {/* Date limite */}
        <div>
          <label htmlFor="date_limite" className="block text-sm font-medium text-gray-800">Date limite de candidature</label>
          <input
            type="date"
            id="date_limite"
            value={formData.date_limite}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            required
          />
        </div>

        {/* Bouton */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 transition"
            disabled={loading}
          >
            {loading ? "Publication en cours..." : "Publier l'offre"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreerOffre;
