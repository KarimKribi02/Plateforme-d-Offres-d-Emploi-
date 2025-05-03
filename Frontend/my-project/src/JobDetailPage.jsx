import React from 'react';
import { useParams, Link } from 'react-router-dom';

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

const JobDetailPage = () => {
  const { id } = useParams();
  const offer = jobOffers.find((job) => job.id === parseInt(id));

  if (!offer) {
    return <div className="p-6">Offre non trouvée</div>;
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

      {/* Détails de l'offre */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <Link to={offer.companyLink} className="text-blue-600 font-semibold text-lg hover:underline block mb-4">
            {offer.company}
          </Link>
          <h1 className="text-2xl font-bold mb-2">{offer.title}</h1>
          <p className="text-gray-700 mb-2">📍 {offer.location}</p>
          <p className="text-gray-700 mb-2">📄 Contrat : {offer.contract}</p>
          <p className="text-gray-600 mt-4">
            Ceci est une description fictive du poste pour la démonstration. Vous pouvez ajouter des détails ici.
          </p>

          {/* Bouton Postuler */}
          <div className="mt-6">
          <Link
            to={`/postuler/${offer.id}`}  // Lien vers la page de postulation
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Postuler
          </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
