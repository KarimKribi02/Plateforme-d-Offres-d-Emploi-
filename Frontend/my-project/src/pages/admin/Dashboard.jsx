import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [offres, setOffres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'active', 'expired'
  const [selectedOffres, setSelectedOffres] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = () => {
    setIsLoading(true);
    // Remplace cette URL par ton endpoint réel si différent
    axios.get('http://127.0.0.1:8000/api/offres')
      .then(response => {
        setOffres(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des offres :", error);
        setError("Impossible de charger les données");
        setIsLoading(false);
      });
  };

  // Supprimer les offres sélectionnées
  const deleteSelectedOffres = () => {
    const promises = selectedOffres.map(id => {
      return axios.delete(`http://127.0.0.1:8000/api/offres/${id}`)
        .catch(error => {
          console.error(`Erreur lors de la suppression de l'offre ${id}:`, error);
          return Promise.reject(error);
        });
    });

    Promise.all(promises)
      .then(() => {
        fetchOffres(); // Rafraîchir les données
        setSelectedOffres([]); // Réinitialiser la sélection
        setShowDeleteModal(false); // Fermer la modal
      })
      .catch(() => {
        setError("Erreur lors de la suppression des offres");
      });
  };

  // Toggle la sélection d'une offre
  const toggleOffreSelection = (id) => {
    if (selectedOffres.includes(id)) {
      setSelectedOffres(selectedOffres.filter(offreId => offreId !== id));
    } else {
      setSelectedOffres([...selectedOffres, id]);
    }
  };

  // Calcul des statistiques
  const totalOffres = offres.length;
  const offresActives = offres.filter(offre => new Date(offre.date_limite) >= new Date()).length;
  const offresExpirees = offres.filter(offre => new Date(offre.date_limite) < new Date()).length;

  // Filtrer les offres selon le tab actif
  const filteredOffres = offres.filter(offre => {
    if (activeTab === 'active') {
      return new Date(offre.date_limite) >= new Date();
    } else if (activeTab === 'expired') {
      return new Date(offre.date_limite) < new Date();
    }
    return true;
  });

  // Rendu pour chaque tab
  const renderTabContent = () => {
    if (activeTab === 'overview') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total des offres */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total des offres
                    </dt>
                    <dd>
                      <div className="text-lg font-bold text-gray-900">
                        {totalOffres}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Toutes les offres publiées
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <button 
                  onClick={() => setActiveTab('all')} 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Voir toutes les offres
                </button>
              </div>
            </div>
          </div>

          {/* Offres actives */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Offres actives
                    </dt>
                    <dd>
                      <div className="text-lg font-bold text-gray-900">
                        {offresActives}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Offres en cours de validité
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <button 
                  onClick={() => setActiveTab('active')}
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Gérer les offres actives
                </button>
              </div>
            </div>
          </div>

          {/* Offres expirées */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Offres expirées
                    </dt>
                    <dd>
                      <div className="text-lg font-bold text-gray-900">
                        {offresExpirees}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Offres dont la date limite est dépassée
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <button 
                  onClick={() => setActiveTab('expired')}
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  Supprimer les offres expirées
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Affichage des listes d'offres (actives ou expirées)
      return (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'active' ? 'Offres Actives' : activeTab === 'expired' ? 'Offres Expirées' : 'Toutes les Offres'}
            </h2>
            {activeTab === 'expired' && selectedOffres.length > 0 && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Supprimer {selectedOffres.length} offres sélectionnées
              </button>
            )}
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredOffres.length > 0 ? (
                filteredOffres.map((offre) => (
                  <li key={offre.id}>
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      {activeTab === 'expired' && (
                        <div className="mr-4">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedOffres.includes(offre.id)}
                            onChange={() => toggleOffreSelection(offre.id)}
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <div className="flex text-sm">
                            <p className="font-medium text-blue-600 truncate">{offre.titre}</p>
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                              {offre.type_contrat}
                            </p>
                          </div>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {offre.localisation}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex-shrink-0 sm:mt-0">
                          <div className="flex overflow-hidden">
                            <p className={`px-2 py-1 text-xs font-medium rounded-full ${
                              new Date(offre.date_limite) >= new Date()
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              Date limite: {new Date(offre.date_limite).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-5 text-center text-gray-500">
                  Aucune offre trouvée dans cette catégorie.
                </li>
              )}
            </ul>
          </div>
        </div>
      );
    }
  };

  // Modal de confirmation de suppression
  const renderDeleteModal = () => {
    if (!showDeleteModal) return null;

    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Supprimer les offres
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Vous êtes sur le point de supprimer {selectedOffres.length} offre(s) expirée(s). Cette action est irréversible. Voulez-vous continuer ?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={deleteSelectedOffres}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Supprimer
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Tableau de Bord Admin</h1>
              </div>
              <nav className="ml-6 flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Vue d'ensemble
                </button>
                <button
                  onClick={() => setActiveTab('active')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'active'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Offres actives
                </button>
                <button
                  onClick={() => setActiveTab('expired')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'expired'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Offres expirées
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contenu principal */}
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
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
        ) : (
          renderTabContent()
        )}
      </div>

      {/* Modal de suppression */}
      {renderDeleteModal()}
    </div>
  );
}