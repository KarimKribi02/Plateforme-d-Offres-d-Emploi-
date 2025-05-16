import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PagePostuler() {
  const { id } = useParams();
  const [offre, setOffre] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérification si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Si pas de token, rediriger vers la page de login
    }

    // Récupérer les détails de l'offre
    const fetchOffre = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/offres/${id}`);
        const data = await response.json();
        if (response.ok) {
          setOffre(data);
        } else {
          setError('Erreur lors de la récupération des informations de l\'offre.');
        }
      } catch (err) {
        setError('Erreur lors de la récupération des informations de l\'offre.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffre();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    // Vérification si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être connecté pour postuler.');
      setSubmitting(false);
      return;
    }

    // Envoie la candidature
    try {
      const response = await fetch('http://localhost:3002/api/candidatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          offreId: id,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Votre candidature a été soumise avec succès !');
        setMessage(''); // Réinitialiser le formulaire
      } else {
        setError(data.message || 'Erreur lors de la soumission de votre candidature.');
      }
    } catch (err) {
      setError('Erreur lors de la soumission de votre candidature.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !offre) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-red-50 rounded-lg shadow-md">
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Retour
        </button>
      </div>
    );
  }

  if (!offre) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
        <p className="text-gray-600 font-medium">Aucune offre trouvée.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 mb-10">
      {/* En-tête de candidature */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Candidature pour le poste</h1>
        <h2 className="text-xl font-semibold text-blue-600 mt-2">{offre.titre}</h2>
      </div>

      {/* Informations sur l'offre */}
      <div className="bg-gray-50 p-5 rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Détails de l'offre</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Type de contrat</p>
            <p className="font-medium">{offre.type_contrat}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Localisation</p>
            <p className="font-medium">{offre.localisation}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Salaire</p>
            <p className="font-medium">{offre.salaire ?? 'Non précisé'}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Compétences requises</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {offre.competences ? 
                offre.competences.split(',').map((competence, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                    {competence.trim()}
                  </span>
                )) : 
                <span className="text-gray-600">Non spécifiées</span>
              }
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-1">Description</p>
          <p className="text-gray-700">{offre.description}</p>
        </div>
      </div>

      {/* Formulaire de candidature */}
      <div className="bg-white rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Votre candidature</h3>

        {error && (
          <div className="mb-6 bg-red-50 p-4 rounded-md">
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
          <div className="mb-6 bg-green-50 p-4 rounded-md">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message de motivation
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-[150px] p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="Expliquez pourquoi vous êtes intéressé(e) par ce poste et en quoi votre profil correspond..."
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                submitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                'Envoyer ma candidature'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}