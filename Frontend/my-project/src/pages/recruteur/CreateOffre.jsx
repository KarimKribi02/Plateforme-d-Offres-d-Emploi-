import React, { useState } from 'react';
import axios from 'axios';

export default function CreateOffre() {
  // State pour les champs du formulaire, avec date_limite ajouté
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type_contrat: '',
    localisation: '',
    secteur: '',
    salaire: '',
    competences_requises: '',
    date_limite: '', // nouveau champ date limite
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const entrepriseId = localStorage.getItem('entreprise_id') || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('recruteur_token');

    const offerData = {
      ...formData,
      entreprise_id: parseInt(entrepriseId),
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/api/offres',
        offerData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const offreId = response.data.id;
      localStorage.setItem('offre_id', offreId);

      setSuccess('Offre créée avec succès');
      setError(null);
      
      setFormData({
        titre: '',
        description: '',
        type_contrat: '',
        localisation: '',
        secteur: '',
        salaire: '',
        competences_requises: '',
        date_limite: '',
      });
    } catch (err) {
      setError('Erreur lors de la création de l\'offre');
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Créer une offre d'emploi</h2>
          <p className="mt-2 text-sm text-gray-600">
            Complétez le formulaire ci-dessous pour publier une nouvelle offre d'emploi
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h3 className="text-lg font-medium text-white">Détails de l'offre</h3>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            {/* ... autres champs ... */}

            <div>
              <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre de l'offre</label>
              <input
                type="text"
                id="titre"
                placeholder="Ex: Développeur Full Stack React/Laravel"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description du poste</label>
              <textarea
                id="description"
                placeholder="Décrivez le poste, les responsabilités et les attentes..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="type_contrat" className="block text-sm font-medium text-gray-700">Type de contrat</label>
              <select
                id="type_contrat"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="type_contrat"
                value={formData.type_contrat}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Sélectionner le type de contrat</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
                <option value="Alternance">Alternance</option>
              </select>
            </div>

            <div>
              <label htmlFor="localisation" className="block text-sm font-medium text-gray-700">Localisation</label>
              <input
                type="text"
                id="localisation"
                placeholder="Ex: Paris, Lyon, Télétravail..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="localisation"
                value={formData.localisation}
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
              <label htmlFor="salaire" className="block text-sm font-medium text-gray-700">Salaire (€/an)</label>
              <input
                type="number"
                id="salaire"
                placeholder="Ex: 45000"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="salaire"
                value={formData.salaire}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="competences_requises" className="block text-sm font-medium text-gray-700">Compétences requises</label>
              <textarea
                id="competences_requises"
                placeholder="Ex: React, Laravel, MySQL, Git..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                name="competences_requises"
                value={formData.competences_requises}
                onChange={handleChange}
                required
              />
            </div>

            {/* Nouveau champ date limite */}
            <div>
              <label htmlFor="date_limite" className="block text-sm font-medium text-gray-700">Date limite de candidature</label>
              <input
                type="date"
                id="date_limite"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="date_limite"
                value={formData.date_limite}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Publication en cours...' : 'Publier l\'offre'}
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
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
