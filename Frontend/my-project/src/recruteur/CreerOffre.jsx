import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CreerOffre = () => {
  const navigate = useNavigate(); // Hook de redirection
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
    // Ici, tu enverras les données à l'API pour publier l'offre

    // Après publication, redirection vers la page "Mes offres"
    navigate('/recruteur/mes-offres');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold mb-6 text-center text-violet-700">Créer une offre de stage</h2>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Créez une offre de stage en remplissant les informations ci-dessous. Assurez-vous d'inclure tous les détails importants pour attirer les bons candidats.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
        {/* Titre de l'offre */}
        <div className="mb-6">
          <label htmlFor="titre" className="block text-sm font-medium text-gray-800">Titre de l'offre</label>
          <input
            type="text"
            id="titre"
            value={formData.titre}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Ex : Développeur React"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Titre de l'offre de stage.</p>
        </div>

        {/* Description de l'offre */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-800">Description de l'offre</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Décrivez les missions du stage..."
            required
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">Donnez des détails sur les missions et les responsabilités.</p>
        </div>

        {/* Exigences pour l'offre */}
        <div className="mb-6">
          <label htmlFor="exigences" className="block text-sm font-medium text-gray-800">Exigences du poste</label>
          <textarea
            id="exigences"
            value={formData.exigences}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Précisez les compétences requises..."
            required
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">Précisez les qualifications et compétences requises pour le poste.</p>
        </div>

        {/* Date de début */}
        <div className="mb-6">
          <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-800">Date de début</label>
          <input
            type="date"
            id="dateDebut"
            value={formData.dateDebut}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Indiquez la date de début souhaitée pour le stage.</p>
        </div>

        {/* Durée du stage */}
        <div className="mb-6">
          <label htmlFor="duree" className="block text-sm font-medium text-gray-800">Durée du stage</label>
          <input
            type="text"
            id="duree"
            value={formData.duree}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Ex : 3 mois"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Durée du stage en mois ou en semaines.</p>
        </div>

        {/* Rémunération */}
        <div className="mb-6">
          <label htmlFor="remuneration" className="block text-sm font-medium text-gray-800">Rémunération</label>
          <input
            type="text"
            id="remuneration"
            value={formData.remuneration}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Ex : 500€ par mois"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Indiquez la rémunération pour le stage (si applicable).</p>
        </div>

        {/* Bouton de publication */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-violet-600 text-white rounded-xl shadow-lg hover:bg-violet-700 transition duration-300"
          >
            Publier l'offre
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreerOffre;
