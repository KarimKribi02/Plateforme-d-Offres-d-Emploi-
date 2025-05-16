import { useEffect, useState } from "react";
import axios from "axios";

export default function OffresRecruteur() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const token = localStorage.getItem("recruteur_token");
        const entrepriseId = parseInt(localStorage.getItem("entreprise_id")); // doit être stocké à la connexion ou à la création

        const response = await axios.get("http://localhost:8000/api/offres", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const offresFiltrees = response.data.filter(
          (offre) => offre.entreprise_id === entrepriseId
        );

        setOffres(offresFiltrees);
      } catch (error) {
        console.error("Erreur lors du chargement des offres :", error);
        setErreur("Erreur lors du chargement des offres.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffres();
  }, []);

  if (loading) return <div className="p-4">Chargement des offres...</div>;
  if (erreur) return <div className="p-4 text-red-500">{erreur}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mes Offres de Stage</h1>

      {offres.length === 0 ? (
        <p>Aucune offre créée pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offres.map((offre) => (
            <div key={offre.id} className="bg-white shadow rounded-xl p-6 border">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{offre.titre}</h2>
              <p className="text-sm text-gray-600 mb-1">📍 {offre.lieu}</p>
              <p className="text-sm text-gray-600 mb-1">⏳ Durée : {offre.duree}</p>
              <p className="text-sm text-gray-600 mb-2">🗓️ Date limite : {offre.date_limite}</p>
              <p className="text-sm text-gray-700">{offre.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
