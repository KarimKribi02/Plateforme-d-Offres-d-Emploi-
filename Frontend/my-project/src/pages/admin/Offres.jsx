import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, FileText, Calendar, Plus, Filter } from 'lucide-react';

export default function Offres() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSecteur, setFilterSecteur] = useState('');
  const [filterContrat, setFilterContrat] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 mb-6">
            <svg width="80" height="80" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
              <g fill="none" fillRule="evenodd" strokeWidth="2">
                <circle cx="22" cy="22" r="18">
                  <animate attributeName="stroke-opacity"
                    begin="0s" dur="1.8s"
                    values="1;0" calcMode="spline"
                    keyTimes="0;1" keySplines="0.3,0.3,0.3,0.3"
                    repeatCount="indefinite" />
                  <animate attributeName="r"
                    begin="0s" dur="1.8s"
                    values="18;30" calcMode="spline"
                    keyTimes="0;1" keySplines="0.3,0.3,0.3,0.3"
                    repeatCount="indefinite" />
                </circle>
                <circle cx="22" cy="22" r="10">
                  <animate attributeName="stroke-opacity"
                    begin="0.3s" dur="1.8s"
                    values="1;0" calcMode="spline"
                    keyTimes="0;1" keySplines="0.3,0.3,0.3,0.3"
                    repeatCount="indefinite" />
                  <animate attributeName="r"
                    begin="0.3s" dur="1.8s"
                    values="10;22" calcMode="spline"
                    keyTimes="0;1" keySplines="0.3,0.3,0.3,0.3"
                    repeatCount="indefinite" />
                </circle>
              </g>
            </svg>
          </div>
          <p className="text-xl font-medium text-white">Chargement des offres...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="rounded-2xl shadow-2xl overflow-hidden bg-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header avec vague SVG */}
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-8 text-white">
              <motion.h2 
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Gestion des Offres
              </motion.h2>
              <motion.p 
                className="text-blue-100 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Tableau de bord administrateur pour visualiser et gérer les offres d'emploi
              </motion.p>
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-6 text-white fill-current">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
              </svg>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="p-6 bg-white">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center bg-gray-50 rounded-full p-2 shadow-inner">
                <Search className="text-blue-500 ml-2" size={20} />
                <input
                  type="text"
                  className="w-full bg-transparent border-none focus:ring-0 pl-2 pr-4 py-2 rounded-full text-gray-700 placeholder-gray-400"
                  placeholder="Rechercher une offre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <motion.button
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 ml-2 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter size={16} className="mr-2" />
                  <span>Filtres</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Filtres déroulants */}
            <motion.div
              className="mt-4 bg-blue-50 rounded-xl p-4"
              initial="hidden"
              animate={isFilterOpen ? "visible" : "hidden"}
              variants={{
                visible: { opacity: 1, height: "auto", marginTop: 16 },
                hidden: { opacity: 0, height: 0, marginTop: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="secteur" className="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
                  <select
                    id="secteur"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
            </motion.div>
          </div>

          {/* Liste des offres */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                <span className="text-blue-600">{filteredOffres.length}</span> offres trouvées
              </h3>
             
            </div>
            
            {filteredOffres.length === 0 ? (
              <motion.div 
                className="bg-blue-50 p-12 rounded-2xl text-center border border-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="text-blue-500" size={40} />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Aucune offre trouvée</h4>
                <p className="text-gray-600">Modifiez vos critères de recherche ou ajoutez de nouvelles offres.</p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {filteredOffres.map((offre) => {
                  const isExpired = new Date(offre.date_limite) < new Date();
                  
                  return (
                    <motion.div 
                      key={offre.id || offre._id}
                      className="group"
                      variants={fadeIn}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className={`bg-white rounded-xl shadow-lg overflow-hidden border ${isExpired ? 'border-red-100' : 'border-blue-100'} h-full flex flex-col`}>
                        <div className={`p-4 ${isExpired ? 'bg-gradient-to-r from-red-50 to-red-100' : 'bg-gradient-to-r from-blue-50 to-blue-100'}`}>
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">{offre.titre}</h3>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              isExpired 
                                ? 'bg-white text-red-500 border border-red-200' 
                                : 'bg-white text-blue-500 border border-blue-200'
                            }`}>
                              {isExpired ? 'Expirée' : 'Active'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4 flex-1 flex flex-col">
                          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{offre.description}</p>
                          
                          <div className="space-y-3 mt-auto">
                            <div className="flex items-center text-sm">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <Briefcase className="w-4 h-4 text-blue-500" />
                              </div>
                              <span className="font-medium text-gray-700">{offre.secteur}</span>
                            </div>
                            
                            <div className="flex items-center text-sm">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <MapPin className="w-4 h-4 text-blue-500" />
                              </div>
                              <span className="text-gray-700">{offre.localisation}</span>
                            </div>
                            
                            <div className="flex items-center text-sm">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <FileText className="w-4 h-4 text-blue-500" />
                              </div>
                              <span className="text-gray-700">{offre.type_contrat}</span>
                            </div>
                            
                            <div className="flex items-center text-sm">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <Calendar className="w-4 h-4 text-blue-500" />
                              </div>
                              <span className={isExpired ? 'text-red-500 font-medium' : 'text-gray-700'}>
                                Limite: {new Date(offre.date_limite).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                  
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}