import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

      {isModalOpen && selectedOffre && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">{selectedOffre.titre}</h3>
            <p className="text-gray-700 mb-1"><strong>Contrat :</strong> {selectedOffre.type_contrat}</p>
            <p className="text-gray-700 mb-1"><strong>Localisation :</strong> {selectedOffre.localisation}</p>
            <p className="text-gray-700 mb-1"><strong>Date limite :</strong> {selectedOffre.date_limite}</p>
            <p className="text-gray-700 my-4"><strong>Description :</strong> {selectedOffre.description}</p>
            <p className="text-gray-700"><strong>Secteur :</strong> {selectedOffre.secteur}</p>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => handlePostuler(selectedOffre)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Postuler
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
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
