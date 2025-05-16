// src/pages/recruteur/Candidats.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Candidats() {
  const navigate = useNavigate();

  const handleVoirClick = (id) => {
    navigate(`/recruteur/candidats/${id}`); // page de détails
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Candidats postulés</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((id) => (
          <div key={id} className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">Candidat #{id}</h3>
            <p>Postulé à l'offre X - Voir le CV, lettre de motivation, etc.</p>
            <button
              onClick={() => handleVoirClick(id)}
              className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Voir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
