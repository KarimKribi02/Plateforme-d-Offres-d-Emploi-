import React from 'react';
import { useParams, Link } from 'react-router-dom';

const allJobOffers = [
  {
    id: 1,
    title: "Développeur Full Stack",
    company: "TechCorp",
    location: "Casablanca",
    contract: "CDI",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Marrakech",
    contract: "Stage",
  },
  {
    id: 3,
    title: "Chef de projet",
    company: "ProjectX",
    location: "Rabat",
    contract: "CDD",
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "TechCorp",
    location: "Fès",
    contract: "CDD",
  },
];

const EntrepriseDetailPage = () => {
  const { name } = useParams();

  // Filtrer les offres correspondant à l'entreprise
  const offers = allJobOffers.filter(
    (offer) => offer.company.toLowerCase() === name.toLowerCase()
  );

  if (offers.length === 0) {
    return (
      <div className="p-6 text-center text-red-500">
        Aucune offre trouvée pour l'entreprise "{name}".
      </div>
    );
  }

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-700">EmploisPlus</h1>
        <div className="flex space-x-4 items-center">
          <Link
            to="/JobOffersPage"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Rechercher
          </Link>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Déconnexion
          </button>
        </div>
      </nav>


      <h1 className="text-2xl font-bold mb-6 text-center mt-6">
        Offres chez {offers[0].company}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300 ease-in-out">
            <Link to={`/entreprises/${offer.company.toLowerCase()}`} className="text-blue-600 font-semibold text-lg hover:underline block mb-4">
              {offer.company}
            </Link>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{offer.title}</h2>
            <p className="text-gray-600 text-sm mb-2">📍 {offer.location}</p>
            <p className="text-gray-600 text-sm mb-4">📄 {offer.contract}</p>
            
            <Link
              to={`/offres/${offer.id}`}
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
            >
              Voir Détail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntrepriseDetailPage;
