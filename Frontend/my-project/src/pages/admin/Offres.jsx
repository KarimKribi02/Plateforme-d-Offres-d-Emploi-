import React, { useEffect, useState } from 'react';

export default function Offres() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSecteur, setFilterSecteur] = useState('');
  const [filterContrat, setFilterContrat] = useState('');

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3002/api/admin/offers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setOffres(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des offres :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffres();
  }, []);

  // Récupération des secteurs et types de contrats uniques pour les filtres
  const secteurs = [...new Set(offres.map(offre => offre.secteur))];
  const typesContrat = [...new Set(offres.map(offre => offre.type_contrat))];

  // Filtrer les offres en fonction des critères
  const filteredOffres = offres.filter(offre => {
    const matchSearch = offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        offre.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSecteur = filterSecteur === '' || offre.secteur === filterSecteur;
    const matchContrat = filterContrat === '' || offre.type_contrat === filterContrat;
    
    return matchSearch && matchSecteur && matchContrat;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Chargement des offres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-blue-600 text-white">
            <h2 className="text-3xl font-bold">Gestion des Offres</h2>
            <p className="mt-2 text-blue-100">Tableau de bord administrateur pour visualiser et gérer les offres d'emploi</p>
          </div>

          {/* Filtres et recherche */}
          <div className="p-6 bg-gray-50 border-b">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
                <input
                  type="text"
                  id="search"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Rechercher une offre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="secteur" className="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
                <select
                  id="secteur"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={filterSecteur}
                  onChange={(e) => setFilterSecteur(e.target.value)}
                >
                  <option value="">Tous les secteurs</option>
                  {secteurs.map((secteur, index) => (
                    <option key={index} value={secteur}>{secteur}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="contrat" className="block text-sm font-medium text-gray-700 mb-1">Type de contrat</label>
                <select
                  id="contrat"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={filterContrat}
                  onChange={(e) => setFilterContrat(e.target.value)}
                >
                  <option value="">Tous les contrats</option>
                  {typesContrat.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>



          {/* Liste des offres */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Liste des offres ({filteredOffres.length})</h3>
            
            {filteredOffres.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg text-gray-600">Aucune offre trouvée.</p>
                <p className="text-sm text-gray-500 mt-1">Modifiez vos critères de recherche ou ajoutez de nouvelles offres.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOffres.map((offre) => {
                  const isExpired = new Date(offre.date_limite) < new Date();
                  
                  return (
                    <div 
                      key={offre.id || offre._id} 
                      className={`bg-white rounded-lg shadow-md overflow-hidden border ${isExpired ? 'border-red-200' : 'border-green-200'} transition-transform hover:shadow-lg hover:-translate-y-1`}
                    >
                      <div className={`p-4 ${isExpired ? 'bg-red-50' : 'bg-green-50'}`}>
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{offre.titre}</h3>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {isExpired ? 'Expirée' : 'Active'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{offre.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">{offre.secteur}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{offre.localisation}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{offre.type_contrat}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className={isExpired ? 'text-red-600 font-medium' : ''}>
                              Date limite: {new Date(offre.date_limite).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                    
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}