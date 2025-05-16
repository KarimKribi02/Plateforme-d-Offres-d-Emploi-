import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ role }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Exemple : suppression du token depuis localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };
  
  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/offres', label: 'Offres' },
    { to: '/admin/candidatures', label: 'Candidatures' },
    { to: '/admin/create-compte', label: 'Créer un compte' },
  ];
  
  const recruteurLinks = [
    { to: '/recruteur/dashboard', label: 'Dashboard' },
    { to: '/recruteur/create-entreprise', label: 'Créer une entreprise' },
    { to: '/recruteur/create-offre', label: 'Créer une offre' },
    { to: '/recruteur/voir-offre', label: 'Voir offres' },
    { to: '/recruteur/candidats', label: 'Candidats postulés' },
  ];
  
  const candidatLinks = [
    { to: '/candidat/dashboard', label: 'Dashboard' },
    { to: '/candidat/offres', label: 'Offres' },
    { to: '/candidat/mes-candidatures', label: 'Mes candidatures' },
  ];
  
  const links = role === 'admin' ? adminLinks : role === 'recruteur' ? recruteurLinks : candidatLinks;
  
  // Style vertical pour admin et recruteur
  if (role === 'admin' || role === 'recruteur') {
    return (
      <nav className="h-screen w-64 bg-blue-600 text-white fixed top-0 left-0 shadow-lg flex flex-col justify-between">
        <div>
          <div className="p-6 text-xl font-bold border-b border-blue-400">
            <Link to="/">Plateforme d'Offres</Link>
          </div>
          <ul className="flex flex-col mt-6 space-y-4 px-4">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="block py-2 px-3 rounded hover:bg-blue-500">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t border-blue-400">
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-3 rounded hover:bg-blue-500"
          >
            Déconnexion
          </button>
        </div>
      </nav>
    );
  }
  
  // Style horizontal pour candidat
  return (
    <nav className="bg-blue-600 text-white w-full shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">
                Plateforme d'Offres
              </Link>
            </div>
            <div className="ml-10 flex items-center space-x-4">
              {links.map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}