import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function OffreDetail() {
  const { id } = useParams(); // récupère l'id depuis l'URL
  const [offre, setOffre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/offres/${id}`)
      .then((response) => {
        setOffre(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors du chargement de l'offre.");
        setLoading(false);
      });
  }, [id]);

  if (loading) 
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
    
  if (error) 
    return (
      <div className="max-w-3xl mx-auto p-8 bg-red-50 rounded-lg shadow-md mt-10">
        <div className="text-red-600 font-medium">{error}</div>
      </div>
    );
    
  if (!offre) 
    return (
      <div className="max-w-3xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md mt-10">
        <div className="text-gray-600 font-medium">Aucune offre trouvée.</div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      {/* En-tête de l'offre */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{offre.titre}</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
            {offre.type_contrat}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
            {offre.localisation}
          </span>
          {offre.salaire && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
              {offre.salaire}
            </span>
          )}
        </div>
      </div>

      {/* Détails de l'offre */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{offre.description}</p>
        </div>

        {offre.competences && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Compétences requises</h3>
            <div className="flex flex-wrap gap-2">
              {offre.competences.split(',').map((competence, index) => (
                <span 
                  key={index}
                  className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {competence.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="mt-8 flex gap-4">
        <Link
          to={`/candidat/postuler/${offre.id}`}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-200 text-center inline-block"
        >
          Postuler maintenant
        </Link>
        <Link
          to="/candidat/offres"
          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200 text-center inline-block"
        >
          Retour aux offres
        </Link>
      </div>
    </div>
  );
}