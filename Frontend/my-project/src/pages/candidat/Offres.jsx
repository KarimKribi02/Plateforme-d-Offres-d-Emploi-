import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Offres() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/offres', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('recruteur_token')}`,
          },
        });
        setOffres(response.data);
        setLoading(false);
      } catch (err) {
        setError('Une erreur est survenue lors de la récupération des offres.');
        setLoading(false);
      }
    };
    
    fetchOffres();
  }, []);

  // Filtrer les offres en fonction du type de contrat et du terme de recherche
  const filteredOffres = offres.filter(offre => {
    const matchesType = filterType === 'all' || offre.type_contrat === filterType;
    const matchesSearch = offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          offre.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          offre.localisation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
  
  // Récupération des types de contrats uniques pour les filtres
  const typeContrats = [...new Set(offres.map(offre => offre.type_contrat))];
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-700 font-medium text-lg">Chargement des opportunités...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex justify-center items-center p-6">
        
        <div className="bg-white border-l-4 border-red-500 rounded-lg p-6 shadow-lg max-w-md">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Erreur de chargement</h3>
              <p className="text-gray-600 mt-1">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Offres d'emploi
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos opportunités professionnelles et trouvez le poste qui correspond à vos compétences et aspirations
          </p>
        </header>

        {/* Filtres et recherche */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher une offre..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
              
              {typeContrats.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filterType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {filteredOffres.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune offre trouvée</h3>
            <p className="text-gray-500">
              {searchTerm || filterType !== 'all' 
                ? "Aucune offre ne correspond à vos critères de recherche." 
                : "Aucune offre d'emploi disponible pour le moment."}
            </p>
            {(searchTerm || filterType !== 'all') && (
              <button
                onClick={() => {setSearchTerm(''); setFilterType('all');}}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredOffres.map((offre) => (
              <div 
                key={offre.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative pb-1">
                  <div className="absolute top-0 right-0 mt-4 mr-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                      ${offre.type_contrat === 'CDI' ? 'bg-green-100 text-green-800' : 
                        offre.type_contrat === 'CDD' ? 'bg-yellow-100 text-yellow-800' : 
                        offre.type_contrat === 'Stage' ? 'bg-purple-100 text-purple-800' : 
                        'bg-blue-100 text-blue-800'}`}
                    >
                      {offre.type_contrat}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 pr-20">{offre.titre}</h3>
                    
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{offre.localisation}</span>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-gray-600 line-clamp-3">{offre.description}</p>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {offre.date_publication ? new Date(offre.date_publication).toLocaleDateString() : 'Date non spécifiée'}
                      </div>
                      <Link to={`/candidat/offres/${offre.id}`} className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out text-sm">
                        Voir détails
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        
      </div>
    </div>
  );
}
