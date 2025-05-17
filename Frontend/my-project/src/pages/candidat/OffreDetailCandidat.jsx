import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OffreDetailCandidat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offre, setOffre] = useState(null);
  const [entrepriseNom, setEntrepriseNom] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOffreDetail();
  }, []);

  const fetchOffreDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/offres/${id}`);
      setOffre(response.data);
      fetchEntrepriseNom(response.data.entreprise_id);
    } catch (error) {
      console.error("Erreur lors de la récupération du détail de l'offre", error);
    }
  };

  const fetchEntrepriseNom = async (entrepriseId) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/entreprises');
      const entreprise = response.data.find((e) => e.id === entrepriseId);
      setEntrepriseNom(entreprise ? entreprise.nom : 'Entreprise inconnue');
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises", error);
    }
  };

  const handlePostuler = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3002/api/candidatures',
        {
          offreId: id,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      localStorage.setItem('candidature_id', response.data.id);
      toast.success('Votre candidature a été envoyée avec succès !', {
        position: 'top-right',
      });
      setMessage('');
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erreur lors de la création de la candidature", error);
      toast.error("Erreur lors de l'envoi de la candidature.", {
        position: 'top-right',
      });
    }
    setLoading(false);
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.6, 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  if (!offre) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-blue-600 text-xl font-medium"
        >
          Chargement du détail de l'offre...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 py-12 px-4">
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ 
          background: "#ebf5ff", 
          color: "#1e40af",
          borderLeft: "4px solid #3b82f6"
        }}
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        {/* Main Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-90 rounded-2xl shadow-xl border border-blue-100 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-8 text-white relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full opacity-20"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '400px 400px'
              }}
            />
            <motion.h2 
              className="text-3xl md:text-4xl font-bold tracking-tighter relative z-10"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2, duration: 0.6 }
                }
              }}
            >
              {offre.titre}
            </motion.h2>
            <motion.div 
              className="mt-2 flex items-center text-blue-100 relative z-10"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.6 }
                }
              }}
            >
              <span className="font-medium">{entrepriseNom}</span>
              <span className="mx-2">•</span>
              <span>{offre.localisation}</span>
            </motion.div>
          </div>
          
          <div className="p-8">
            {/* Informations principales */}
            <motion.div 
              variants={itemVariants}
              className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-blue-500 font-medium">Secteur</div>
                  <div className="text-gray-700 font-medium">{offre.secteur}</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-blue-500 font-medium">Type de contrat</div>
                  <div className="text-gray-700 font-medium">{offre.type_contrat}</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-blue-500 font-medium">Date limite</div>
                  <div className="text-gray-700 font-medium">{offre.date_limite}</div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-blue-500 font-medium">Localisation</div>
                  <div className="text-gray-700 font-medium">{offre.localisation}</div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Description
              </h3>
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400 leading-relaxed text-gray-700">
                {offre.description}
              </div>
            </motion.div>

            {/* Message de motivation */}
            <motion.div variants={itemVariants} className="mb-8">
              <label className="block text-blue-700 font-semibold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Message de motivation
              </label>
              <textarea
                className="w-full border-2 border-blue-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white bg-opacity-80 resize-none"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Expliquez pourquoi ce poste vous intéresse et en quoi votre profil correspond..."
              ></textarea>
            </motion.div>

            {/* Boutons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-6"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 bg-gray-100 text-blue-700 rounded-lg font-medium hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors duration-200 border border-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Retour
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handlePostuler}
                disabled={loading}
                className={`flex-1 px-6 py-3 ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                } text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Postuler maintenant</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Footer text */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-8 text-blue-700 opacity-80 text-sm"
        >
          © {new Date().getFullYear()} - Trouvez votre emploi idéal aujourd'hui
        </motion.div>
      </motion.div>
    </div>
  );
}

export default OffreDetailCandidat;