// src/pages/candidat/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CandidatDashboard() {
  const [stats, setStats] = useState({
    totalCandidatures: 0,
    enAttente: 0,
    acceptees: 0,
    refusees: 0
  });
  const [recentOffres, setRecentOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Vous n'êtes pas connecté");
          setLoading(false);
          return;
        }

        // Récupérer les informations de l'utilisateur
        const userRes = await fetch('http://localhost:3002/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          setUserName(userData.nom || userData.prenom || 'Utilisateur');
        }

        // Récupérer les statistiques des candidatures
        const candidaturesRes = await fetch('http://localhost:3002/api/candidatures/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!candidaturesRes.ok) {
          throw new Error("Impossible de récupérer vos candidatures");
        }

        const candidaturesData = await candidaturesRes.json();
        
        // Calculer les statistiques
        const statsData = {
          totalCandidatures: candidaturesData.length,
          enAttente: candidaturesData.filter(c => c.statut?.toLowerCase() === 'en attente').length,
          acceptees: candidaturesData.filter(c => c.statut?.toLowerCase() === 'acceptée').length,
          refusees: candidaturesData.filter(c => c.statut?.toLowerCase() === 'refusée').length
        };
        
        setStats(statsData);

        // Récupérer les offres récentes
        const offresRes = await fetch('http://localhost:3002/api/offres?limit=5', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (offresRes.ok) {
          const offresData = await offresRes.json();
          setRecentOffres(offresData);
        }

        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des données :', err);
        setError("Une erreur est survenue lors du chargement de vos données");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center p-6">
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Chargement de votre tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg border-l-4 border-red-500">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">{error}</h2>
          </div>
          <div className="mt-6">
            <Link to="/login" className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Tableau de bord</h1>
              <div className="w-20 h-1 bg-indigo-600 mb-4"></div>
              <p className="text-slate-600">Bienvenue, {userName} ! {getCurrentDate()}</p>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total des candidatures</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">{stats.totalCandidatures}</h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">En attente</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">{stats.enAttente}</h3>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Acceptées</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">{stats.acceptees}</h3>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-rose-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Refusées</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">{stats.refusees}</h3>
              </div>
              <div className="bg-rose-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

       
  
      </div>
    </div>
  );
}