// src/pages/candidat/MesCandidatures.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MesCandidatures() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Vous n'êtes pas connecté");
          setLoading(false);
          return;
        }

        const res = await fetch('http://localhost:3002/api/candidatures/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Impossible de récupérer vos candidatures");
        }

        const data = await res.json();

        const enriched = await Promise.all(
          data.map(async (candidature) => {
            let offreData = {};
            let entrepriseData = { nom: 'Entreprise non disponible' };

            try {
              const offreRes = await fetch(`http://localhost:3002/api/offres/${candidature.offreId}`);
              if (offreRes.ok) {
                offreData = await offreRes.json();

                if (offreData.entreprise_id) {
                  const entrepriseRes = await fetch(`http://localhost:3002/api/entreprises/${offreData.entreprise_id}`);
                  if (entrepriseRes.ok) {
                    entrepriseData = await entrepriseRes.json();
                  }
                }
              }
            } catch (error) {
              console.error('Erreur lors de la récupération de l\'offre ou de l\'entreprise', error);
            }

            return {
              ...candidature,
              offre: offreData,
              entreprise: entrepriseData,
            };
          })
        );

        setCandidatures(enriched);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des candidatures :', err);
        setError("Une erreur est survenue lors du chargement de vos candidatures");
        setLoading(false);
      }
    };

    fetchCandidatures();
  }, []);

  const handleCancelCandidature = async (id) => {
    try {
      setCancellingId(id);
      const token = localStorage.getItem('token');
      
      const res = await fetch(`http://localhost:3002/api/candidatures/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        // Mettre à jour l'état local après suppression réussie
        setCandidatures(candidatures.filter(candidature => candidature._id !== id));
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Impossible d'annuler cette candidature");
      }
    } catch (err) {
      console.error("Erreur lors de l'annulation de la candidature:", err);
      alert("Une erreur est survenue lors de l'annulation de la candidature");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadgeColor = (statut) => {
    switch (statut?.toLowerCase()) {
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'acceptée':
        return 'bg-green-100 text-green-800';
      case 'refusée':
        return 'bg-red-100 text-red-800';
      case 'en cours d\'examen':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Chargement de vos candidatures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-red-50 rounded-lg p-6 shadow-md">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-lg font-medium text-red-800">{error}</h2>
          </div>
          <div className="mt-4">
            <Link to="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mes candidatures</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gérez et suivez toutes vos candidatures à des offres d'emploi
          </p>
        </div>

        {/* Content */}
        {candidatures.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-4">
              <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune candidature pour le moment</h3>
            <p className="text-gray-500 mb-6">Vous n'avez pas encore postulé à des offres d'emploi.</p>
            <Link 
              to="/offres" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Découvrir les offres
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {candidatures.map((candidature) => (
              <div key={candidature._id} className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {candidature.offre?.titre || "Offre non disponible"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {candidature.entreprise?.nom || "Entreprise non disponible"}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(candidature.statut)}`}>
                    {candidature.statut || "Statut inconnu"}
                  </span>
                </div>
                
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date de candidature</p>
                      <p className="text-sm font-medium">
                        {new Date(candidature.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    {candidature.offre?.type_contrat && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Type de contrat</p>
                        <p className="text-sm font-medium">{candidature.offre.type_contrat}</p>
                      </div>
                    )}
                    
                    {candidature.offre?.localisation && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Localisation</p>
                        <p className="text-sm font-medium">{candidature.offre.localisation}</p>
                      </div>
                    )}
                    
                    {candidature.message && (
                      <div className="md:col-span-2">
                        <p className="text-xs text-gray-500 mb-1">Votre message</p>
                        <p className="text-sm italic text-gray-600">
                          {candidature.message.length > 150 
                            ? `${candidature.message.substring(0, 150)}...` 
                            : candidature.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
                  <Link
                    to={`/candidat/offres/${candidature.offreId}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Voir l'offre
                  </Link>
                  
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}