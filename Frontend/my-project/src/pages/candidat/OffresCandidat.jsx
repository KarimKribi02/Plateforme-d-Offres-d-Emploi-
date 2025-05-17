import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

function OffresCandidat() {
  const [offres, setOffres] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchOffres(), fetchEntreprises()]);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const fetchOffres = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/offres');
      setOffres(response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des offres", error);
      return [];
    }
  };

  const fetchEntreprises = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/entreprises');
      setEntreprises(response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises", error);
      return [];
    }
  };

  const getEntrepriseNom = (entrepriseId) => {
    const entreprise = entreprises.find((e) => e.id === entrepriseId);
    return entreprise ? entreprise.nom : 'Entreprise inconnue';
  };

  const getSectors = () => {
    const sectors = offres.map(offre => offre.secteur || 'Non spécifié');
    return ['Tous les secteurs', ...new Set(sectors)];
  };

  const filteredOffres = offres.filter(offre => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           getEntrepriseNom(offre.entreprise_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (offre.description && offre.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSector = selectedSector === '' || selectedSector === 'Tous les secteurs' || 
                           offre.secteur === selectedSector;
    
    return matchesSearch && matchesSector;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: index * 0.05,
        duration: 0.5,
        ease: "easeOut" 
      }
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: index * 0.05,
        duration: 0.5
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 10px 25px rgba(37, 99, 235, 0.2)",
      transition: { duration: 0.3 },
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(37, 99, 235, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const shineAnimation = {
    initial: { backgroundPosition: '-100% 0' },
    animate: {
      backgroundPosition: ['200% 0', '-100% 0'],
      transition: { repeat: Infinity, duration: 1.5 }
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] px-4 py-8 md:py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-10"></div>
        <motion.div 
          className="absolute top-1/3 left-1/4 w-48 h-48 bg-blue-200 rounded-full filter blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Header content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Découvrez votre futur emploi
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Parcourez nos offres d'emploi actuelles et trouvez celle qui correspond à vos compétences et aspirations.
        </p>
      </motion.div>

      {/* Search and filter controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-4xl mx-auto mb-8"
      >
        <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher par titre, entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all"
              />
            </div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full py-3 px-4 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all"
            >
              {getSectors().map((sector, idx) => (
                <option key={idx} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Job listings */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-16"
          >
            <motion.div 
              className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        ) : filteredOffres.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-10"
          >
            <div className="inline-block p-6 bg-blue-50 rounded-full mb-4">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune offre trouvée</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffres.map((offre, index) => (
                <motion.div
                  key={offre.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-blue-100 flex flex-col group relative"
                >
                  {/* Card top decoration */}
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold text-lg">
                          {getEntrepriseNom(offre.entreprise_id).charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">{getEntrepriseNom(offre.entreprise_id)}</p>
                        <p className="text-xs text-gray-500">{offre.localisation}</p>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {offre.titre}
                    </h2>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {offre.type_contrat && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                          {offre.type_contrat}
                        </span>
                      )}
                      {offre.secteur && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                          {offre.secteur}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {offre.description}
                    </p>
                  </div>
                  
                  <div className="p-4 pt-0">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => navigate(`/candidat/offres/${offre.id}`)}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium transition-all"
                    >
                      Voir le détail
                    </motion.button>
                  </div>
                  
                  {/* Shine effect on hover */}
                  {/* <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                    style={{ backgroundSize: '200% 100%' }}
                    variants={shineAnimation}
                    initial="initial"
                    whileHover="animate"
                  /> */}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OffresCandidat;