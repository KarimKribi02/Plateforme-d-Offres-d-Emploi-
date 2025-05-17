import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OffreDetailCandidat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offre, setOffre] = useState(null);
  const [entrepriseNom, setEntrepriseNom] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOffreDetail();
  }, []);

  const fetchOffreDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/offres/${id}`);
      setOffre(response.data);
      fetchEntrepriseNom(response.data.entreprise_id);
    } catch (error) {
      console.error("Erreur lors de la récupération du détail de l'offre", error);
    }
  };

  const fetchEntrepriseNom = async (entrepriseId) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/entreprises');
      const entreprise = response.data.find(e => e.id === entrepriseId);
      if (entreprise) {
        setEntrepriseNom(entreprise.nom);
      } else {
        setEntrepriseNom('Entreprise inconnue');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises", error);
    }
  };

  const handlePostuler = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3002/api/candidatures',
        {
          offreId: id,
          message: message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      localStorage.setItem('candidature_id', response.data.id);
      toast.success("Votre candidature a été envoyée avec succès !");
      setMessage('');
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erreur lors de la création de la candidature", error);
      toast.error("Erreur lors de l'envoi de la candidature.");
    }
    setLoading(false);
  };

  if (!offre) {
    return <p className="p-8">Chargement du détail de l'offre...</p>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow">
      <ToastContainer position="top-right" />
      <h2 className="text-3xl font-bold text-blue-600 mb-4">{offre.titre}</h2>
      <p className="text-gray-600 mb-2">Entreprise : <span className="font-semibold">{entrepriseNom}</span></p>
      <p className="text-gray-600 mb-2">Localisation : {offre.localisation}</p>
      <p className="text-gray-600 mb-2">Secteur : {offre.secteur}</p>
      <p className="text-gray-600 mb-2">Type de contrat : {offre.type_contrat}</p>
      <p className="text-gray-600 mb-2">Date limite : {offre.date_limite}</p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">Description :</h3>
      <p className="text-gray-700 mb-6">{offre.description}</p>

      {/* Champ message */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Message de motivation :</label>
        <textarea
          className="w-full border rounded p-2"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message ici..."
        ></textarea>
      </div>

      {/* Boutons */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Retour
        </button>

        <button
          onClick={handlePostuler}
          disabled={loading}
          className={`px-4 py-2 ${loading ? 'bg-blue-300' : 'bg-blue-500'} text-white rounded hover:bg-blue-600`}
        >
          {loading ? 'Envoi...' : 'Postuler'}
        </button>
      </div>
    </div>
  );
}

export default OffreDetailCandidat;
