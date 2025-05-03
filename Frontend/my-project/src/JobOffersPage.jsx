import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const JobOffersPage = () => {
  const navigate = useNavigate();

  const jobOffers = [
    {
      id: 1,
      title: "Développeur Full Stack",
      company: "TechCorp",
      location: "Casablanca",
      contract: "CDI",
      companyLink: "/entreprises/techcorp"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignStudio",
      location: "Marrakech",
      contract: "Stage",
      companyLink: "/entreprises/designstudio"
    },
    {
      id: 3,
      title: "Chef de projet",
      company: "ProjectX",
      location: "Rabat",
      contract: "CDD",
      companyLink: "/entreprises/projectx"
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [contractFilter, setContractFilter] = useState("");

  const handleLogout = () => {
    navigate('/login');
  };

  const filteredOffers = jobOffers.filter((offer) =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (locationFilter === "" || offer.location === locationFilter) &&
    (contractFilter === "" || offer.contract === contractFilter)
  );

  const uniqueLocations = [...new Set(jobOffers.map(o => o.location))];
  const uniqueContracts = [...new Set(jobOffers.map(o => o.contract))];

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

      {/* Filtres */}
      <div className="bg-white shadow p-6 mt-4 mx-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">🔎 Filtrer les offres</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher par titre"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">📍 Tous les lieux</option>
            {uniqueLocations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            value={contractFilter}
            onChange={(e) => setContractFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">📄 Tous les contrats</option>
            {uniqueContracts.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Résultats */}
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Offres d'emploi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
              <Link to={offer.companyLink} className="text-blue-600 hover:underline font-medium">
                {offer.company}
              </Link>
              <p className="text-gray-600 mt-2">📍 {offer.location}</p>
              <p className="text-gray-600">📄 {offer.contract}</p>
              <Link
                to={`/offres/${offer.id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Voir Détail
              </Link>
            </div>
          ))}
        </div>
        {filteredOffers.length === 0 && (
          <p className="text-center text-gray-500 mt-8">Aucune offre trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default JobOffersPage;
