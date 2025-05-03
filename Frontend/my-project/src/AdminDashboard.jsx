import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Tableau de bord', icon: '📊' },
    { id: 'recruiters', name: 'Comptes recruteurs', icon: '👥' },
    { id: 'jobs', name: 'Offres d\'emploi', icon: '📝' },
    { id: 'applications', name: 'Candidatures', icon: '📨' },
    { id: 'categories', name: 'Catégories', icon: '🏷️' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">Statistiques globales</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-700 font-medium">Recruteurs</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-purple-700 font-medium">Offres</p>
                    <p className="text-2xl font-bold">56</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-700 font-medium">Candidatures</p>
                    <p className="text-2xl font-bold">128</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-amber-700 font-medium">Catégories</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
              </div>
        
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">Activité récente</h2>
                <ul className="space-y-3">
                  <li className="border-b border-gray-100 pb-2">
                    <p className="text-sm text-gray-600">Il y a 1 heure</p>
                    <p>Nouveau recruteur inscrit: <span className="font-medium">Paul Richard</span></p>
                  </li>
                  <li className="border-b border-gray-100 pb-2">
                    <p className="text-sm text-gray-600">Il y a 3 heures</p>
                    <p>Nouvelle offre en attente: <span className="font-medium">Designer UX/UI</span></p>
                  </li>
                  <li className="border-b border-gray-100 pb-2">
                    <p className="text-sm text-gray-600">Il y a 1 jour</p>
                    <p>Catégorie modifiée: <span className="font-medium">Marketing</span></p>
                  </li>
                </ul>
              </div>
            </div>
        
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Offres à valider</h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Analyste financier</p>
                    <p className="text-sm text-gray-600">Finance Expert - 08/04/2025</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:underline">Approuver</button>
                    <button className="text-red-600 hover:underline">Rejeter</button>
                  </div>
                </li>
                <li className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Designer UX/UI</p>
                    <p className="text-sm text-gray-600">Tech Solutions - 01/05/2025</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:underline">Approuver</button>
                    <button className="text-red-600 hover:underline">Rejeter</button>
                  </div>
                </li>
              </ul>
            </div>
        
            
          </div>
        );
        
      case 'recruiters':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Comptes recruteurs</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="mb-4">Créer, gérer et supprimer les comptes recruteurs.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Ajouter un recruteur
              </button>
            </div>
          </div>
        );
      case 'jobs':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Offres d'emploi</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="mb-4">Consulter toutes les offres publiées par les recruteurs.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">Titre</th>
                      <th className="py-2 px-4 text-left">Recruteur</th>
                      <th className="py-2 px-4 text-left">Catégorie</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4">Développeur Front-end</td>
                      <td className="py-2 px-4">Tech Solutions</td>
                      <td className="py-2 px-4">Développement</td>
                      <td className="py-2 px-4">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">Voir</button>
                        <button className="text-red-600 hover:text-red-800">Supprimer</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'applications':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Candidatures</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p>Visualiser toutes les candidatures envoyées.</p>
            </div>
          </div>
        );
      case 'categories':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Catégories</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="mb-4">CRUD des catégories d'emploi (ajout, suppression, filtrage...)</p>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Nouvelle catégorie" 
                  className="border rounded px-3 py-2 flex-grow"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Ajouter
                </button>
              </div>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Développement</span>
                    <div>
                      <button className="text-blue-600 hover:text-blue-800 mr-2">Modifier</button>
                      <button className="text-red-600 hover:text-red-800">Supprimer</button>
                    </div>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Marketing</span>
                    <div>
                      <button className="text-blue-600 hover:text-blue-800 mr-2">Modifier</button>
                      <button className="text-red-600 hover:text-red-800">Supprimer</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Sélectionnez une section</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">Dashboard Admin</h1>
        </div>
        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full p-4 hover:bg-blue-900 ${
                    activeSection === item.id ? 'bg-blue-900' : ''
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;