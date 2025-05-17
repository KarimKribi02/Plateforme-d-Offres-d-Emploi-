import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, User, Mail, Lock } from 'lucide-react';

export default function CreateCompte() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');

      // Simulons un délai pour voir l'animation de chargement
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await fetch('http://localhost:3001/api/auth/recruiters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création du compte');
      }

      setSuccess('Compte recruteur créé avec succès.');
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white border-opacity-20">
          <motion.div 
            className="bg-blue-600 py-6 relative overflow-hidden"
            initial={{ height: "4rem" }}
            animate={{ height: "5rem" }}
            transition={{ duration: 0.5 }}
          >
            {/* Cercles décoratifs animés */}
            <motion.div 
              className="absolute top-4 right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ repeat: Infinity, duration: 8 }}
            />
            <motion.div 
              className="absolute bottom-0 left-12 w-16 h-16 bg-blue-300 rounded-full opacity-20"
              animate={{ 
                scale: [1, 1.3, 1],
                x: [0, 20, 0],
              }}
              transition={{ repeat: Infinity, duration: 6, delay: 1 }}
            />
            
            <h2 className="text-center text-2xl font-bold text-white relative z-10">
              Créer un compte recruteur
            </h2>
          </motion.div>
          
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Nom
                </label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-3 text-blue-200">
                    <User size={18} />
                  </span>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nom complet"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 appearance-none block w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg shadow-sm placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-3 text-blue-200">
                    <Mail size={18} />
                  </span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="exemple@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 appearance-none block w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg shadow-sm placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Mot de passe
                </label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-3 text-blue-200">
                    <Lock size={18} />
                  </span>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 appearance-none block w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg shadow-sm placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-70"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Créer le compte"
                  )}
                </button>
              </motion.div>
              
              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-green-500 bg-opacity-20 border border-green-300 border-opacity-30 rounded-lg p-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0 text-green-300">
                      <CheckCircle size={20} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-100">{success}</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-500 bg-opacity-20 border border-red-300 border-opacity-30 rounded-lg p-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0 text-red-300">
                      <AlertCircle size={20} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-100">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}