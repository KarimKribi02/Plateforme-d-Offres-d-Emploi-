import React, { useState, useEffect } from 'react';
import { ChevronRight, Building2, Briefcase, MapPin, Globe, Check, AlertCircle } from 'lucide-react';

export default function CreateEntreprise() {
  // State pour les champs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    secteur: '',
    adresse: '',
    site_web: ''
  });

  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // État pour la gestion des erreurs ou du succès
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

  // Animation d'entrée
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    // Simuler une soumission réussie pour la démo
    setTimeout(() => {
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
      setIsSubmitting(false);
    }, 1500);
  };

  // Fonction pour gérer le focus des champs
  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  // Fonction pour obtenir la classe dynamique de chaque champ
  const getFieldClasses = (fieldName) => {
    return `mt-1 block w-full border rounded-lg shadow-sm py-3 px-4 transition-all duration-300 focus:outline-none ${
      activeField === fieldName 
        ? 'border-blue-500 ring-2 ring-blue-200' 
        : 'border-gray-200 hover:border-blue-300'
    }`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className={`max-w-3xl mx-auto transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Créer une entreprise
          </h2>
          <p className="mt-2 text-sm text-blue-700 font-medium">
            Complétez le formulaire ci-dessous pour ajouter votre entreprise
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all hover:shadow-2xl duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Building2 className="mr-2" size={22} />
              Informations de l'entreprise
            </h3>
          </div>

          <div className="px-6 py-8 space-y-6">
            <div className="transform transition-all duration-300 hover:translate-x-1">
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 flex items-center">
                <Briefcase className="mr-2 text-blue-500" size={16} />
                Nom de l'entreprise
              </label>
              <input
                type="text"
                id="nom"
                placeholder="Ex: Tech Solutions"
                className={getFieldClasses('nom')}
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                onFocus={() => handleFocus('nom')}
                onBlur={handleBlur}
                required
              />
            </div>

            <div className="transform transition-all duration-300 hover:translate-x-1">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                placeholder="Décrivez votre entreprise en quelques lignes..."
                className={getFieldClasses('description')}
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                onFocus={() => handleFocus('description')}
                onBlur={handleBlur}
                required
              />
            </div>

            <div className="transform transition-all duration-300 hover:translate-x-1">
              <label htmlFor="secteur" className="block text-sm font-medium text-gray-700">Secteur d'activité</label>
              <select
                id="secteur"
                className={getFieldClasses('secteur')}
                name="secteur"
                value={formData.secteur}
                onChange={handleChange}
                onFocus={() => handleFocus('secteur')}
                onBlur={handleBlur}
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

            <div className="transform transition-all duration-300 hover:translate-x-1">
              <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 flex items-center">
                <MapPin className="mr-2 text-blue-500" size={16} />
                Adresse
              </label>
              <input
                type="text"
                id="adresse"
                placeholder="Ex: 123 Rue des Entrepreneurs, 75001 Paris"
                className={getFieldClasses('adresse')}
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                onFocus={() => handleFocus('adresse')}
                onBlur={handleBlur}
                required
              />
            </div>

            <div className="transform transition-all duration-300 hover:translate-x-1">
              <label htmlFor="site_web" className="block text-sm font-medium text-gray-700 flex items-center">
                <Globe className="mr-2 text-blue-500" size={16} />
                Site Web
              </label>
              <input
                type="url"
                id="site_web"
                placeholder="Ex: https://www.entreprise.com"
                className={getFieldClasses('site_web')}
                name="site_web"
                value={formData.site_web}
                onChange={handleChange}
                onFocus={() => handleFocus('site_web')}
                onBlur={handleBlur}
              />
            </div>

            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-medium text-white transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enregistrement...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Enregistrer l'entreprise 
                    <ChevronRight className="ml-2" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg transition-all duration-300 hover:shadow-md animate-pulse">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-400" />
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