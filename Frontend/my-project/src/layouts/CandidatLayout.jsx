// src/layouts/CandidatLayout.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function CandidatLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Déconnecté");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">Plateforme d'Emploi</h1>
        <div className="flex space-x-6">
          <Link to="/candidat/offres" className="text-gray-700 hover:text-blue-500 font-medium">Postuler</Link>
          <Link to="/candidat/profil" className="text-gray-700 hover:text-blue-500 font-medium">Profil</Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default CandidatLayout;
