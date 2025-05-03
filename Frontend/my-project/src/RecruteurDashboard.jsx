import React, { useState } from 'react';

const RecruteurDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'entreprise', label: 'Créer entreprise', icon: '🏢' },
    { id: 'offre', label: 'Créer une offre', icon: '📝' },
    { id: 'candidatures', label: 'Candidatures reçues', icon: '👥' },
    { id: 'profil', label: 'Mon profil / Paramètres', icon: '👤' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profil':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Mon profil / Paramètres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informations personnelles</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md p-2" defaultValue="Mon Recruteur" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-md p-2" defaultValue="recruteur@entreprise.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-md p-2" defaultValue="+33 1 23 45 67 89" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md p-2" defaultValue="Responsable Recrutement" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Paramètres du compte</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Français</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuseau horaire</label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Europe/Paris (UTC+2)</option>
                    <option>Europe/London (UTC+1)</option>
                    <option>America/New_York (UTC-4)</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                    <span className="text-sm">Notifications par email</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                    <span className="text-sm">Notifications dans l'application</span>
                  </label>
                </div>
                <div className="pt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Enregistrer les modifications</button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'entreprise':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Créer une entreprise</h2>
            <p className="mb-4">Ajoutez une nouvelle entreprise au système en précisant sa catégorie.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select className="w-full border border-gray-300 rounded-md p-2">
                  <option>Technologie</option>
                  <option>Finance</option>
                  <option>Santé</option>
                  <option>Éducation</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Créer l'entreprise</button>
            </div>
          </div>
        );
      case 'offre':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Créer une offre d'emploi</h2>
            <p className="mb-4">Publiez une nouvelle offre d'emploi selon la spécialité.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre du poste</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
                <select className="w-full border border-gray-300 rounded-md p-2">
                  <option>Développement web</option>
                  <option>Marketing digital</option>
                  <option>Ressources humaines</option>
                  <option>Finances</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full border border-gray-300 rounded-md p-2 h-32"></textarea>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Publier l'offre</button>
            </div>
          </div>
        );
      case 'candidatures':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Candidatures reçues</h2>
            <p className="mb-4">Consultez et gérez les candidatures pour vos offres d'emploi.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3">Candidat</th>
                    <th className="p-3">Poste</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3">Jean Dupont</td>
                    <td className="p-3">Développeur Frontend</td>
                    <td className="p-3">28/04/2025</td>
                    <td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">En attente</span></td>
                    <td className="p-3">
                      <button className="text-blue-600 hover:underline mr-2">Voir</button>
                      <button className="text-green-600 hover:underline">Accepter</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3">Marie Martin</td>
                    <td className="p-3">Responsable Marketing</td>
                    <td className="p-3">27/04/2025</td>
                    <td className="p-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Entretien</span></td>
                    <td className="p-3">
                      <button className="text-blue-600 hover:underline mr-2">Voir</button>
                      <button className="text-red-600 hover:underline">Rejeter</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">Statistiques</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-700 font-medium">Offres actives</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-700 font-medium">Candidatures</p>
                    <p className="text-2xl font-bold">48</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-purple-700 font-medium">Entretiens</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-amber-700 font-medium">Embauches</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">Activité récente</h2>
                <ul className="space-y-3">
                  <li className="border-b border-gray-100 pb-2">
                    <p className="text-sm text-gray-600">Il y a 2 heures</p>
                    <p>Nouvelle candidature pour "Développeur Frontend"</p>
                  </li>
                  <li className="border-b border-gray-100 pb-2">
                    <p className="text-sm text-gray-600">Il y a 5 heures</p>
                    <p>Offre "Designer UX/UI" publiée</p>
                  </li>
                  <li>
                    <p className="text-sm text-gray-600">Il y a 1 jour</p>
                    <p>Entretien planifié avec Marie Martin</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveSection('entreprise')}
                  className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center"
                >
                  <span className="text-2xl mb-2">🏢</span>
                  <span className="font-medium">Créer entreprise</span>
                </button>
                <button 
                  onClick={() => setActiveSection('offre')}
                  className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center"
                >
                  <span className="text-2xl mb-2">📝</span>
                  <span className="font-medium">Créer une offre</span>
                </button>
                <button 
                  onClick={() => setActiveSection('candidatures')}
                  className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex flex-col items-center"
                >
                  <span className="text-2xl mb-2">👥</span>
                  <span className="font-medium">Candidatures reçues</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">Dashboard Recruteur</h1>
        </div>
        <nav className="mt-6">
          <ul>
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full p-4 hover:bg-blue-900 ${
                    activeSection === item.id ? 'bg-blue-900' : ''
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            {menuItems.find(item => item.id === activeSection)?.label || 'Tableau de bord'}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="bg-white p-2 rounded-full shadow">
              <span>🔔</span>
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                MR
              </div>
              <span className="ml-2">Mon Recruteur</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {renderContent()}
      </div>
    </div>
  );
};

export default RecruteurDashboard;