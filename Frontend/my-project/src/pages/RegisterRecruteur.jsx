import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const RegisterRecruteur = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    secteur: '',
    adresse: '',
    site_web: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Le nom de l'entreprise est requis.";
    if (!formData.description) newErrors.description = "La description est requise.";
    if (!formData.secteur) newErrors.secteur = "Le secteur est requis.";
    if (!formData.adresse) newErrors.adresse = "L'adresse est requise.";
    if (!formData.site_web) newErrors.site_web = "Le site web est requis.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setApiError('');

    try {
      await axios.post('http://127.0.0.1:8000/api/entreprises', formData);
      navigate('/recruteur/creer-offre');
    } catch (error) {
      console.error(error);
      setApiError("Erreur lors de l'enregistrement de l'entreprise.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-4xl font-semibold mb-6 text-center text-violet-700">Créer une entreprise</h2>

      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Nom */}
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-800">Nom de l'entreprise</label>
          <input
            type="text"
            id="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500"
            placeholder="Ex: Tech Reda"
            required
          />
          {errors.nom && <p className="text-red-600 text-sm mt-2">{errors.nom}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-800">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500"
            placeholder="Entreprise innovante..."
            required
          ></textarea>
          {errors.description && <p className="text-red-600 text-sm mt-2">{errors.description}</p>}
        </div>

        {/* Secteur */}
        <div>
          <label htmlFor="secteur" className="block text-sm font-medium text-gray-800">Secteur d'activité</label>
          <input
            type="text"
            id="secteur"
            value={formData.secteur}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500"
            placeholder="Ex: IT, Finance, Agroalimentaire..."
            required
          />
          {errors.secteur && <p className="text-red-600 text-sm mt-2">{errors.secteur}</p>}
        </div>

        {/* Adresse */}
        <div>
          <label htmlFor="adresse" className="block text-sm font-medium text-gray-800">Adresse</label>
          <input
            type="text"
            id="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500"
            placeholder="Ex: Casablanca"
            required
          />
          {errors.adresse && <p className="text-red-600 text-sm mt-2">{errors.adresse}</p>}
        </div>

        {/* Site web */}
        <div>
          <label htmlFor="site_web" className="block text-sm font-medium text-gray-800">Site web</label>
          <input
            type="url"
            id="site_web"
            value={formData.site_web}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500"
            placeholder="https://www.entreprise.com"
            required
          />
          {errors.site_web && <p className="text-red-600 text-sm mt-2">{errors.site_web}</p>}
        </div>

        {/* Bouton */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-violet-600 text-white rounded-xl shadow-lg hover:bg-violet-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Créer l'entreprise"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterRecruteur;
