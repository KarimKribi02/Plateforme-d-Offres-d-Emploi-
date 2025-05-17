import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OffresCandidat() {
  const [offres, setOffres] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffres();
    fetchEntreprises();
  }, []);

  const fetchOffres = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/offres');
      setOffres(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des offres", error);
    }
  };

  const fetchEntreprises = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/entreprises');
      setEntreprises(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises", error);
    }
  };

  const getEntrepriseNom = (entrepriseId) => {
    const entreprise = entreprises.find(e => e.id === entrepriseId);
    return entreprise ? entreprise.nom : 'Entreprise inconnue';
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Liste des Offres</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offres.map((offre) => (
          <div key={offre.id} className="bg-white rounded shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-blue-500 mb-2">{offre.titre}</h2>
              <p className="text-gray-600 mb-1">Entreprise : <span className="font-medium">{getEntrepriseNom(offre.entreprise_id)}</span></p>
              <p className="text-gray-600 mb-1">Lieu : {offre.localisation}</p>
              <p className="text-gray-700 mt-2">{offre.description.slice(0, 80)}...</p>
            </div>

            <button
              onClick={() => navigate(`/candidat/offres/${offre.id}`)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Voir détail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffresCandidat;
