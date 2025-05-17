import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function CandidatLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("Déconnecté");
    navigate('/login');
  };

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
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const navItemVariants = {
    hover: {
      scale: 1.05,
      color: '#2563eb',
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  // Check if a navigation link is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navbar with glass effect */}
      <motion.nav 
        className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/candidat" className="flex items-center space-x-2">
              <motion.div 
                className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
              <motion.span 
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                JobConnect
              </motion.span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.div variants={navItemVariants} whileHover="hover">
                <Link
                  to="/candidat/offres"
                  className={`text-lg font-medium ${isActive('/candidat/offres') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-500'} transition-colors duration-200`}
                >
                  <div className="flex items-center space-x-2">
                    <span>Offres</span>
                    {isActive('/candidat/offres') && (
                      <motion.div 
                        className="h-1 w-1 rounded-full bg-blue-600"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                </Link>
              </motion.div>
              
              <motion.div variants={navItemVariants} whileHover="hover">
                <Link
                  to="/candidat/profil"
                  className={`text-lg font-medium ${isActive('/candidat/profil') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-500'} transition-colors duration-200`}
                >
                  <div className="flex items-center space-x-2">
                    <span>Profil</span>
                    {isActive('/candidat/profil') && (
                      <motion.div 
                        className="h-1 w-1 rounded-full bg-blue-600"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                </Link>
              </motion.div>
              
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleLogout}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-medium shadow-md"
              >
                Déconnexion
              </motion.button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-blue-600 p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 overflow-hidden"
              >
                <div className="flex flex-col space-y-4 py-4">
                  <Link
                    to="/candidat/offres"
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-center py-2 ${isActive('/candidat/offres') 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-700'} rounded-lg`}
                  >
                    Offres
                  </Link>
                  <Link
                    to="/candidat/profil"
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-center py-2 ${isActive('/candidat/profil') 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-700'} rounded-lg`}
                  >
                    Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg"
                  >
                    Déconnexion
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Page content with animation */}
      <motion.main 
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={location.pathname}
      >
        <Outlet />
      </motion.main>

      {/* Decorative elements */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 h-64 w-64 rounded-full bg-blue-200 opacity-20 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-blue-400 opacity-10 blur-3xl"
          animate={{ 
            x: [0, -70, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </div>
  );
}

export default CandidatLayout;