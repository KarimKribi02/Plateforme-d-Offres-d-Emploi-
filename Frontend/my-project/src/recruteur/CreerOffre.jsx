import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Layout from '../components/Layout';

const CreerOffre = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    exigences: '',
    dateDebut: '',
    duree: '',
    remuneration: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appel API pour enregistrer l'offre ici

    // Redirection après soumission
    navigate('/recruteur/mes-offres');
  };

  return (
    <Layout>
    <div className="container mx-auto px-2 py-1 max-w-3xl pt-2">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-center text-violet-600">
          Créez une offre de stage
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Créez une offre de stage en remplissant les informations ci-dessous. Assurez-vous d'inclure tous les détails importants pour attirer les bons candidats.
        </p>
  
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Titre */}
          <div>
            <label htmlFor="titre" className="block text-sm font-medium text-gray-800">Titre de l'offre</label>
            <input
              type="text"
              id="titre"
              value={formData.titre}
              onChange={handleChange}
              className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Ex : Développeur React"
              required
            />
          </div>
  
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-800">Description de l'offre</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Décrivez les missions du stage..."
              required
            ></textarea>
          </div>
  
          {/* Exigences */}
          <div>
            <label htmlFor="exigences" className="block text-sm font-medium text-gray-800">Exigences du poste</label>
            <textarea
              id="exigences"
              value={formData.exigences}
              onChange={handleChange}
              className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Précisez les compétences requises..."
              required
            ></textarea>
          </div>
  
          {/* Date de début */}
          <div>
            <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-800">Date de début</label>
            <input
              type="date"
              id="dateDebut"
              value={formData.dateDebut}
              onChange={handleChange}
              className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
  
          {/* Durée */}
          <div>
            <label htmlFor="duree" className="block text-sm font-medium text-gray-800">Durée du stage</label>
            <input
              type="text"
              id="duree"
              value={formData.duree}
              onChange={handleChange}
              className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Ex : 3 mois"
              required
            />
          </div>
  
          {/* Rémunération */}
          <div>
            <label htmlFor="remuneration" className="block text-sm font-medium text-gray-800">Rémunération</label>
            <input
              type="text"
              id="remuneration"
              value={formData.remuneration}
              onChange={handleChange}
              className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Ex : 500€ par mois"
              required
            />
          </div>
  
          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-4 bg-violet-600 text-white rounded-xl shadow-lg hover:bg-violet-700 transition duration-300 w-full sm:w-auto"
            >
              Publier l'offre
            </button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
  
  );
};

export default CreerOffre;
