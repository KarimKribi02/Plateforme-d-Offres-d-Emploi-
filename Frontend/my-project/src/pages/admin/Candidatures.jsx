import React, { useEffect, useState } from 'react';

export default function Candidatures() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const token = localStorage.getItem('token'); // Token admin
        const response = await fetch('http://localhost:3002/api/admin/candidatures', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setCandidatures(data);
      } catch (error) {
        console.error('Erreur lors du chargement des candidatures :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidatures();
  }, []);

  const filteredCandidatures = filterStatus === 'all' 
    ? candidatures 
    : candidatures.filter(candidature => candidature.statut === filterStatus);

  const statusColors = {
    'En attente': 'bg-yellow-100 text-yellow-800',
    'Acceptée': 'bg-green-100 text-green-800',
    'Refusée': 'bg-red-100 text-red-800',
    'En cours de traitement': 'bg-blue-100 text-blue-800'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Chargement des candidatures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des candidatures</h1>
          <p className="mt-2 text-sm text-gray-600">
            {candidatures.length} candidature{candidatures.length !== 1 ? 's' : ''} reçue{candidatures.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilterStatus('En attente')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'En attente' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            En attente
          </button>
          <button
            onClick={() => setFilterStatus('En cours de traitement')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'En cours de traitement' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            En cours
          </button>
          <button
            onClick={() => setFilterStatus('Acceptée')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'Acceptée' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Acceptées
          </button>
          <button
            onClick={() => setFilterStatus('Refusée')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'Refusée' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Refusées
          </button>
        </div>

        {filteredCandidatures.length === 0 ? (
          <div className="bg-white rounded-lg shadow px-6 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune candidature trouvée</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filterStatus === 'all' ? 
                "Vous n'avez pas encore reçu de candidatures." : 
                `Aucune candidature avec le statut "${filterStatus}" n'a été trouvée.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCandidatures.map((candidature) => (
              <div 
                key={candidature._id} 
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCandidature(candidature)}
              >
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {candidature?.candidat?.nom || 'Candidat inconnu'}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[candidature?.statut] || 'bg-gray-100 text-gray-800'}`}>
                      {candidature?.statut}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 truncate">{candidature?.offre?.titre || 'Offre non disponible'}</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <p className="text-gray-500 mb-2 truncate">
                      <span className="font-medium text-gray-700">Message : </span>
                      {candidature?.message || '---'}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-medium text-gray-700">Date : </span>
                      {new Date(candidature?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button 
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100 transition"
                    >
                      Voir CV
                    </button>
                    <button 
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100 transition"
                    >
                      Lettre de motivation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal pour le détail d'une candidature */}
        {selectedCandidature && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Détails de la candidature
                </h3>
                <button 
                  onClick={() => setSelectedCandidature(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 py-4">
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Informations du candidat</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nom</p>
                      <p className="font-medium">{selectedCandidature?.candidat?.nom || 'Non spécifié'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedCandidature?.candidat?.email || 'Non spécifié'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="font-medium">{selectedCandidature?.candidat?.telephone || 'Non spécifié'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date de candidature</p>
                      <p className="font-medium">{new Date(selectedCandidature?.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Poste concerné</h4>
                  <p className="font-medium">{selectedCandidature?.offre?.titre || 'Offre non disponible'}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedCandidature?.offre?.description || 'Aucune description disponible'}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Message du candidat</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedCandidature?.message || 'Aucun message'}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Documents</h4>
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <svg className="mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      Télécharger le CV
                    </button>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <svg className="mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Télécharger la lettre de motivation
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setSelectedCandidature(null)}
                >
                  Fermer
                </button>
                <button className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700">
                  Refuser
                </button>
                <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">
                  Marquer "En cours"
                </button>
                <button className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700">
                  Accepter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}