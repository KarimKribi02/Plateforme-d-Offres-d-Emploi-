// src/pages/candidat/HomeCandidat.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomeCandidat() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logique de déconnexion (localStorage.clear(), API logout, etc.)
    console.log("Déconnecté");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      {/* Contenu */}
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Bienvenue sur votre espace Candidat !</h2>
        <p className="text-gray-600 text-lg">Consultez les offres et postulez facilement à celles qui vous intéressent.</p>
      </div>
    </div>
  );
}

export default HomeCandidat;
