import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  TrendingUp, 
  Calendar, 
  Coins, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Building2,
  Code
} from 'lucide-react';

export default function CreateOffre() {
  // État pour les champs du formulaire
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type_contrat: '',
    localisation: '',
    secteur: '',
    salaire: '',
    competences_requises: '',
    date_limite: '',
  });

  // États pour l'interface et l'animation
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Simuler l'ID d'entreprise pour la démo
  const entrepriseId = '12345';

  // Animation d'entrée
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
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
        : 'border-blue-100 hover:border-blue-300'
    }`;
  };

  // Fonction pour gérer la soumission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simuler une requête API
    setTimeout(() => {
      setSuccess('Offre créée avec succès! Votre offre sera visible par les candidats dans quelques minutes.');
      setError(null);
      
      // Réinitialiser le formulaire
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
      
      setIsSubmitting(false);
    }, 1500);
  };

  // Animation pour le tooltip de salaire
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className={`max-w-4xl mx-auto transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
            Créer une offre d'emploi
          </h2>
          <p className="mt-2 text-sm text-blue-600 font-medium">
            Attirez les meilleurs talents en publiant une offre attrayante et complète
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all hover:shadow-2xl duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Briefcase className="mr-2" size={22} />
              Détails de l'offre d'emploi
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
            <div className="transform transition-all duration-300 hover:translate-x-1 col-span-1 md:col-span-2">
              <label htmlFor="titre" className="block text-sm font-medium text-gray-700 flex items-center">
                <FileText className="mr-2 text-blue-500" size={16} />
                Titre de l'offre
              </label>
              <input
                type="text"
                id="titre"
                placeholder="Ex: Développeur Full Stack React/Laravel"
                className={getFieldClasses('titre')}
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                onFocus={() => handleFocus('titre')}
                onBlur={handleBlur}
                required
              />
            </div>

            <div className="transform transition-all duration-300 hover:translate-x-1 col-span-1 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description du poste</label>
              <textarea
                id="description"
                placeholder="Décrivez le poste, les responsabilités et les attentes..."
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
              <label htmlFor="type_contrat" className="block text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <Briefcase className="mr-2 text-blue-500" size={16} />
                  Type de contrat
                </div>
              </label>
              <select
                id="type_contrat"
                className={getFieldClasses('type_contrat')}
                name="type_contrat"
                value={formData.type_contrat}
                onChange={handleChange}
                onFocus={() => handleFocus('type_contrat')}
                onBlur={handleBlur}
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

            <div className="transform transition-all duration-300 hover:translate-x-1">
              <label htmlFor="localisation" className="block text-sm font-medium text-gray-700 flex items-center">
                <MapPin className="mr-2 text-blue-500" size={16} />
                Localisation
              </label>
              <input
                type="text"
                id="localisation"
                placeholder="Ex: Paris, Lyon, Télétravail..."
                className={getFieldClasses('localisation')}
                name="localisation"
                value={formData.localisation}
                onChange={handleChange}
                onFocus={() => handleFocus('localisation')}
                onBlur={handleBlur}
                required
              />
            </div>

            <div className="transform transition-all duration-300 hover:translate-x-1">
              <label htmlFor="secteur" className="block text-sm font-medium text-gray-700 flex items-center">
                <Building2 className="mr-2 text-blue-500" size={16} />
                Secteur d'activité
              </label>
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

            <div className="transform transition-all duration-300 hover:translate-x-1 relative">
              <label htmlFor="salaire" className="block text-sm font-medium text-gray-700 flex items-center">
                <Coins className="mr-2 text-blue-500" size={16} />
                Salaire (€/an)
                <div 
                  className="ml-2 cursor-pointer" 
                  onMouseEnter={toggleTooltip}
                  onMouseLeave={toggleTooltip}
                >
                  <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </label>
              {showTooltip && (
                <div className="absolute bg-blue-800 text-white text-xs p-2 rounded-md shadow-lg -top-10 right-0 z-10 transform transition-all duration-200 opacity-100 scale-100">
                  N'oubliez pas d'indiquer un salaire attractif !
                </div>
              )}
              <input
                type="number"
                id="salaire"
                placeholder="Ex: 45000"
                className={getFieldClasses('salaire')}
                name="salaire"
                value={formData.salaire}
                onChange={handleChange}
                onFocus={() => handleFocus('salaire')}
                onBlur={handleBlur}
                required
              />
            </div>

            <div className="transform transition-all duration-300 hover:translate-x-1">
              <label htmlFor="date_limite" className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="mr-2 text-blue-500" size={16} />
                Date limite de candidature
              </label>
              <input
                type="date"
                id="date_limite"
                className={getFieldClasses('date_limite')}
                name="date_limite"
                value={formData.date_limite}
                onChange={handleChange}
                onFocus={() => handleFocus('date_limite')}
                onBlur={handleBlur}
                required
              />
            </div>

            <div className="transform transition-all duration-300 hover:translate-x-1 col-span-1 md:col-span-2">
              <label htmlFor="competences_requises" className="block text-sm font-medium text-gray-700 flex items-center">
                <Code className="mr-2 text-blue-500" size={16} />
                Compétences requises
              </label>
              <textarea
                id="competences_requises"
                placeholder="Ex: React, Laravel, MySQL, Git..."
                className={getFieldClasses('competences_requises')}
                rows="3"
                name="competences_requises"
                value={formData.competences_requises}
                onChange={handleChange}
                onFocus={() => handleFocus('competences_requises')}
                onBlur={handleBlur}
                required
              />
            </div>

            <div className="pt-4 col-span-1 md:col-span-2">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-medium text-white transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publication en cours...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <TrendingUp className="mr-2" size={18} />
                    Publier l'offre
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
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}