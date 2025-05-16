import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecruteurDashboard() {
  const [stats, setStats] = useState({
    offres: 0,
    candidats: 12, // Tu pourras les rendre dynamiques aussi si tu as une API pour ça
    entreprises: 2,
    entretiens: 3
  });

  useEffect(() => {
    // Récupération des offres depuis l'API
    axios.get('http://localhost:8000/api/offres')
      .then(response => {
        setStats(prev => ({
          ...prev,
          offres: response.data.length
        }));
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des offres :", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Offres publiées</p>
                <p className="text-2xl font-bold text-gray-800">{stats.offres}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                {/* Icône offres */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Autres stats statiques pour le moment */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Candidats</p>
                <p className="text-2xl font-bold text-gray-800">{stats.candidats}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Entreprises</p>
                <p className="text-2xl font-bold text-gray-800">{stats.entreprises}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
