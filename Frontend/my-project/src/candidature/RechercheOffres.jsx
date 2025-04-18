import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const offresData = [
  {
    id: 1,
    title: "Développeur React",
    company: "TechCorp",
    location: "Paris",
    date: "2025-04-01",
    description: "Nous cherchons un développeur React pour un projet exciting.",
    companyDescription: "TechCorp est une entreprise leader dans le domaine de la technologie et des solutions logicielles.",
    jobDescription: "Le développeur React sera responsable de la création et de la gestion des interfaces utilisateur sur les projets clients.",
    requirements: "Expérience en React, connaissance des API REST, bonne capacité à travailler en équipe.",
  },
  {
    id: 2,
    title: "Designer UI/UX",
    company: "DesignWorks",
    location: "Lyon",
    date: "2025-04-10",
    description: "Rejoignez notre équipe en tant que designer UI/UX.",
    companyDescription: "DesignWorks est une agence créative spécialisée dans la conception d'interfaces utilisateur intuitives.",
    jobDescription: "Le designer UI/UX sera en charge de la création d'interfaces graphiques et de l'expérience utilisateur.",
    requirements: "Expérience avec Figma, Sketch, ou Adobe XD, bonnes compétences en prototypage et tests utilisateurs.",
  },
  {
    id: 3,
    title: "Développeur Backend",
    company: "CodeLabs",
    location: "Marseille",
    date: "2025-04-15",
    description: "Nous recrutons un développeur Backend expérimenté.",
    companyDescription: "CodeLabs est une entreprise innovante dans le développement de solutions backend robustes.",
    jobDescription: "Le développeur backend sera responsable de la gestion des bases de données et du développement des API.",
    requirements: "Expérience avec Node.js, MongoDB, et les API REST.",
  },
];

const RechercheOffres = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    date: "",
  });

  const [filteredOffres, setFilteredOffres] = useState(offresData);
  const [selectedOffre, setSelectedOffre] = useState(null); // Etat pour l'offre sélectionnée
  const [isModalOpen, setIsModalOpen] = useState(false); // Etat pour afficher ou masquer le modal

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filtered = offresData.filter((offre) => {
      return (
        (filters.title ? offre.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
        (filters.location ? offre.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
        (filters.date ? offre.date.includes(filters.date) : true)
      );
    });
    setFilteredOffres(filtered);
  };

  const handleViewDetails = (offre) => {
    setSelectedOffre(offre); // Met l'offre sélectionnée dans l'état
    setIsModalOpen(true); // Ouvre le modal
  };

  const handlePostuler = (offre) => {
    navigate("/candidature", { state: { offre } });
  };
  

  const closeModal = () => {
    setIsModalOpen(false); // Ferme le modal
    setSelectedOffre(null); // Réinitialise l'offre sélectionnée
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Recherche d'offres</h2>
      
      {/* Formulaire de filtrage */}
      <form onSubmit={handleFilterSubmit} className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre de l'offre</label>
            <input
              type="text"
              id="title"
              name="title"
              value={filters.title}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex : Développeur React"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lieu</label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex : Paris"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Filtrer
          </button>
        </div>
      </form>

      {/* Cartes des offres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffres.length > 0 ? (
          filteredOffres.map((offre) => (
            <div key={offre.id} className="border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800">{offre.title}</h3>
              <p className="text-sm text-gray-600">{offre.company}</p>
              <p className="text-sm text-gray-500">{offre.location}</p>
              <p className="mt-4 text-gray-700">{offre.description}</p>
              <div className="mt-4 text-right">
                <span className="text-sm text-gray-400">{offre.date}</span>
              </div>
              {/* Bouton pour voir les détails */}
              <button
                onClick={() => handleViewDetails(offre)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600"
              >
                Voir les détails
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucune offre trouvée.</p>
        )}
      </div>

      {/* Modal pour afficher les détails de l'offre */}
      {isModalOpen && selectedOffre && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-2xl font-semibold mb-4">{selectedOffre.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{selectedOffre.company}</p>
            <p className="text-sm text-gray-500 mb-4">{selectedOffre.location}</p>
            
            {/* Informations supplémentaires sur l'entreprise et le poste */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold">À propos de l'entreprise :</h4>
              <p className="text-gray-700">{selectedOffre.companyDescription}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Description du poste :</h4>
              <p className="text-gray-700">{selectedOffre.jobDescription}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Exigences :</h4>
              <p className="text-gray-700">{selectedOffre.requirements}</p>
            </div>

            <p className="text-sm text-gray-400 mb-4">Publié le : {selectedOffre.date}</p>

            {/* Bouton Postuler */}
            <div className="mt-4 text-right">
              <button
                 onClick={() => handlePostuler(selectedOffre)}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Postuler
              </button>
              <button
                onClick={closeModal}
                className="ml-4 px-6 py-3 bg-gray-300 text-gray-700 rounded-xl shadow-lg hover:bg-gray-400 transition duration-300"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RechercheOffres;
