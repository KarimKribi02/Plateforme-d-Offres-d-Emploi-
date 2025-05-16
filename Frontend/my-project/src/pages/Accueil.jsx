import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Accueil() {
  // État pour gérer si l'utilisateur est connecté
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // État pour stocker les informations de l'utilisateur connecté
  const [user, setUser] = useState(null);
  // État pour gérer la connexion
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  // État pour les messages d'erreur
  const [error, setError] = useState('');
  // État pour le formulaire de connexion visible/caché
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Vérifier l'authentification au chargement de la page
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Récupérer les infos utilisateur depuis le localStorage
      const userData = JSON.parse(localStorage.getItem('userData'));
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  // Gestion des changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  // Fonction pour se connecter
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Appel à l'API d'authentification
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }
      
      // Stocker le token et les informations utilisateur
      localStorage.setItem('authToken', data.token);
      // Stocker les données utilisateur (ajustez selon votre API)
      const userData = {
        name: data.user?.name || 'Utilisateur',
        role: data.user?.role || 'candidat',
        // Ajoutez d'autres champs dont vous avez besoin
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Mettre à jour l'état
      setIsLoggedIn(true);
      setUser(userData);
      setShowLoginForm(false);
      setError('');
    } catch (err) {
      setError(err.message || 'Erreur lors de la connexion');
    }
  };

  // Fonction pour se déconnecter
  const handleLogout = () => {
    // Supprimer les informations d'authentification
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUser(null);
  };

  // Toggle le formulaire de connexion
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header - Avec affichage conditionnel selon l'état de connexion */}
      <header className="bg-white bg-opacity-90 sticky top-0 z-10 shadow-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Plateforme Emploi</h1>
          </div>
          
          <nav className="flex items-center space-x-6">
            {/* Afficher différentes options de navigation selon l'état de connexion */}
            {isLoggedIn ? (
              <>
                {/* Menu simplifié pour utilisateur connecté (candidat uniquement) */}
                <Link to="/candidat/offres" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Offres d'emploi
                </Link>
                <Link to="/candidat/mes-candidatures" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Mes candidatures
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                {/* Menu pour visiteur non connecté */}
               
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Connexion
                </Link>
                <Link to="/register/candidat" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow">
                  Inscription
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
                Trouvez ou publiez des <span className="text-blue-600">offres d'emploi</span> facilement
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Bienvenue sur notre plateforme dédiée à la mise en relation entre recruteurs et candidats. 
                Gérez vos candidatures, offres et profils simplement.
              </p>
              
              {/* Appel à l'action adapté en fonction de l'état de connexion */}
              <div className="pt-2">
                {isLoggedIn ? (
                  <Link to="/offres" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 inline-block">
                    Voir les offres d'emploi
                  </Link>
                ) : (
                  <Link to="/register/candidat" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 inline-block">
                    Créer mon compte candidat
                  </Link>
                )}
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                {/* Illustration stylisée d'une recherche d'emploi */}
                <div className="w-full h-80 bg-blue-100 rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                  <svg className="w-48 h-48 text-blue-500 opacity-80" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* Éléments décoratifs */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Pourquoi nous choisir ?</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">Gestion simplifiée</h4>
                <p className="text-gray-600">Gérez facilement vos candidatures ou offres d'emploi depuis un tableau de bord intuitif.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a1 1 0 10-2 0c0 2.61 1.123 4.975 2.854 6.704l.174.18C7.39 18.342 9.153 19 11 19c1.847 0 3.61-.658 4.971-1.916A1 1 0 0016 17c0-.731-.196-1.412-.548-2H11a1 1 0 010-2h4.452z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">Profils détaillés</h4>
                <p className="text-gray-600">Créez un profil complet qui met en valeur vos compétences et expériences professionnelles.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">Mises en relation</h4>
                <p className="text-gray-600">Notre algorithme vous connecte avec les meilleurs candidats ou offres correspondant à vos critères.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold text-white mb-4">Plateforme Emploi</h5>
              <p className="text-sm text-gray-400">
                Votre solution complète pour la recherche d'emploi et le recrutement de talents.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-4">Liens rapides</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/offres" className="hover:text-blue-300 transition-colors">Offres d'emploi</Link></li>
                <li><Link to="/entreprises" className="hover:text-blue-300 transition-colors">Entreprises</Link></li>
                <li><Link to="/conseils" className="hover:text-blue-300 transition-colors">Conseils carrière</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-4">Ressources</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/faq" className="hover:text-blue-300 transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
                <li><Link to="/blog" className="hover:text-blue-300 transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-4">Légal</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/cgu" className="hover:text-blue-300 transition-colors">Conditions d'utilisation</Link></li>
                <li><Link to="/confidentialite" className="hover:text-blue-300 transition-colors">Politique de confidentialité</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Plateforme Emploi — Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}