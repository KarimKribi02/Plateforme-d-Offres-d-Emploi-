import React, { useState } from 'react';
import axios from 'axios';

export default function CreateEntreprise() {
  // State pour les champs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    secteur: '',
    adresse: '',
    site_web: ''
  });

  // State pour la gestion des erreurs ou du succès
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  // Dans votre fonction handleSubmit du composant CreateEntreprise:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const token = localStorage.getItem('token');
  const recruteurId = localStorage.getItem('user_id');
  
  console.log("Token:", token);
  console.log("Recruteur ID:", recruteurId);

  // Ajoutez le recruteur_id aux données du formulaire
  const entrepriseData = {
    ...formData,
    recruteur_id: recruteurId
  };

  console.log("Données à envoyer:", entrepriseData);

  try {
    const response = await axios.post(
      'http://localhost:8000/api/entreprises',
      entrepriseData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Réponse du serveur:", response.data);
    
    // Sauvegarde de l'ID de l'entreprise
    const entrepriseId = response.data.id;
    localStorage.setItem('entreprise_id', entrepriseId);

    setSuccess('Entreprise créée avec succès');
    setError(null);
    
    // Réinitialisation du formulaire
    setFormData({
      nom: '',
      description: '',
      secteur: '',
      adresse: '',
      site_web: ''
    });
  } catch (err) {
    console.error("Erreur détaillée:", err.response ? err.response.data : err);
    setError(`Erreur lors de la création de l'entreprise: ${err.response ? err.response.data.message || JSON.stringify(err.response.data) : err.message}`);
    setSuccess(null);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Créer une entreprise</h2>
          <p className="mt-2 text-sm text-gray-600">
            Complétez le formulaire ci-dessous pour ajouter votre entreprise
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h3 className="text-lg font-medium text-white">Informations de l'entreprise</h3>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom de l'entreprise</label>
              <input
                type="text"
                id="nom"
                placeholder="Ex: Tech Solutions"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                placeholder="Décrivez votre entreprise en quelques lignes..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="secteur" className="block text-sm font-medium text-gray-700">Secteur d'activité</label>
              <select
                id="secteur"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="secteur"
                value={formData.secteur}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Choisir un secteur</option>
                <option value="Informatique">Informatique</option>
                <option value="Finance">Finance</option>
                <option value="Santé">Santé</option>
                <option value="Éducation">Éducation</option>
                <option value="Commerce">Commerce</option>
                <option value="Industrie">Industrie</option>
              </select>
            </div>

            <div>
              <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
              <input
                type="text"
                id="adresse"
                placeholder="Ex: 123 Rue des Entrepreneurs, 75001 Paris"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="site_web" className="block text-sm font-medium text-gray-700">Site Web</label>
              <input
                type="url"
                id="site_web"
                placeholder="Ex: https://www.entreprise.com"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="site_web"
                value={formData.site_web}
                onChange={handleChange}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer l\'entreprise'}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}