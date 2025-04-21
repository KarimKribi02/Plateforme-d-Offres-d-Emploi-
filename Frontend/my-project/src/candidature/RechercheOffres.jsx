import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout';


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
    localisation: "",
    type_contrat: "",
    secteur: "",
  });
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger les offres depuis l'API
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/offres")
      .then((res) => {
        setOffres(res.data);
        setFilteredOffres(res.data);
      })
      .catch((err) => console.error("Erreur lors du chargement des offres :", err));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filtered = offres.filter((offre) => {
      return (
        (filters.title ? offre.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
        (filters.localisation ? offre.localisation.toLowerCase().includes(filters.localisation.toLowerCase()) : true) &&
        (filters.type_contrat ? offre.type_contrat.toLowerCase().includes(filters.type_contrat.toLowerCase()) : true) &&
        (filters.secteur ? offre.secteur.toLowerCase().includes(filters.secteur.toLowerCase()) : true)
      );
    });
    setFilteredOffres(filtered);
  };

  const handleViewDetails = (offre) => {
    setSelectedOffre(offre);
    setIsModalOpen(true);
  };

  const handlePostuler = (offre) => {
    navigate("/candidature", { state: { offre } });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOffre(null);
  };

  return (
    <Layout>
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Recherche d'offres</h2>

      <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={filters.title}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="localisation"
          placeholder="Localisation"
          value={filters.localisation}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="type_contrat"
          placeholder="Type de contrat"
          value={filters.type_contrat}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="secteur"
          placeholder="Secteur"
          value={filters.secteur}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="col-span-full md:col-span-4 mt-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Filtrer
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffres.length > 0 ? (
          filteredOffres.map((offre) => (
            <div key={offre.id} className="bg-white rounded-xl shadow-lg p-6 border hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-bold text-gray-800">{offre.titre}</h3>
              <p className="text-sm text-gray-600 mt-1">{offre.type_contrat}</p>
              <p className="text-sm text-gray-600">{offre.localisation}</p>
              <p className="text-sm text-gray-500 mt-2">Date limite : {offre.date_limite}</p>
              <button
                onClick={() => handleViewDetails(offre)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Voir les détails
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">Aucune offre trouvée.</p>
        )}
      </div>
     {/* Modal pour afficher les détails de l'offre */}
{isModalOpen && selectedOffre && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl mx-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-3xl font-bold  justify-center text-blue-600 mb-2">{selectedOffre.title}</h3>
          <p className="text-sm text-gray-600">{selectedOffre.company} • {selectedOffre.location}</p>

      
        </div>
        <button onClick={closeModal} className="text-gray-500 hover:text-red-500 text-xl font-bold">&times;</button>
      </div>

      <div className="space-y-4 text-gray-700">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">À propos de l'entreprise :</h4>
          <p>{selectedOffre.companyDescription}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Description du poste :</h4>
          <p>{selectedOffre.jobDescription}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Exigences :</h4>
          <p>{selectedOffre.requirements}</p>
        </div>
        <p className="text-sm text-gray-500">📅 Publié le : {selectedOffre.date}</p>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={() => handlePostuler(selectedOffre)}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl font-medium shadow hover:from-blue-600 hover:to-blue-800 transition"
        >
          Postuler
        </button>
        <button
          onClick={closeModal}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-medium shadow hover:bg-gray-300 transition"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    </Layout>
  );
};

export default RechercheOffres;
