// src/pages/recruteur/CandidatureDetail.jsx
import { useParams } from 'react-router-dom';
import React from 'react';

export default function CandidatureDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Détail de la candidature #{id}</h2>
      {/* Affiche ici le détail depuis l’API ou autre */}
      <p>CV, lettre de motivation, infos personnelles, etc.</p>
    </div>
  );
}
