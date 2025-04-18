import { useState } from 'react';

// Exemple d'offres fictives
const initialOffres = [
  {
    id: 1,
    titre: "Développeur React",
    description: "Rejoignez notre équipe pour développer des applications React innovantes.",
    dateDebut: "2025-06-01",
    duree: "6 mois",
    remuneration: "2000€/mois",
  },
  {
    id: 2,
    titre: "Chef de projet web",
    description: "Nous recherchons un chef de projet pour coordonner nos équipes de développement web.",
    dateDebut: "2025-05-15",
    duree: "Contrat à durée indéterminée",
    remuneration: "2500€/mois",
  },
  {
    id: 3,
    titre: "Designer UX/UI",
    description: "Intégrez notre équipe créative pour concevoir des interfaces utilisateurs modernes et ergonomiques.",
    dateDebut: "2025-07-01",
    duree: "12 mois",
    remuneration: "2200€/mois",
  },
];

const MesOffres = () => {
  const [offres, setOffres] = useState(initialOffres);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);

  // Gestion de la modification d'une offre
  const handleEdit = (offre) => {
    setCurrentOffer(offre);
    setIsModalOpen(true);
  };

  // Gestion de la suppression d'une offre
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?');
    if (confirmDelete) {
      setOffres(offres.filter((offre) => offre.id !== id));
    }
  };

  // Mise à jour d'une offre
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedOffres = offres.map((offre) =>
      offre.id === currentOffer.id ? currentOffer : offre
    );
    setOffres(updatedOffres);
    setIsModalOpen(false); // Fermer la modal
  };

  // Gestion des changements dans le formulaire de modification
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOffer({
      ...currentOffer,
      [name]: value,
    });
  };

  // Formate la date au format YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold mb-6">Mes offres publiées</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offres.map((offre) => (
          <div
            key={offre.id}
            className="bg-gray-100 p-6 rounded-xl shadow-xl transition duration-300 hover:shadow-2xl"
          >
            <h3 className="text-xl font-bold text-gray-900">{offre.titre}</h3>
            <p className="mt-2 text-gray-700">{offre.description}</p>
            <div className="mt-4 text-gray-600 text-sm">
              <p><strong>Date de début:</strong> {offre.dateDebut}</p>
              <p><strong>Durée:</strong> {offre.duree}</p>
              <p><strong>Rémunération:</strong> {offre.remuneration}</p>
            </div>
            <div className="mt-6 flex justify-between space-x-4">
              <button
                onClick={() => handleEdit(offre)}
                className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(offre.id)}
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de modification */}
      {isModalOpen && currentOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h3 className="text-2xl font-semibold mb-6">Modifier l'offre</h3>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titre de l'offre</label>
                <input
                  type="text"
                  name="titre"
                  value={currentOffer.titre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={currentOffer.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date de début</label>
                <input
                  type="date"
                  name="dateDebut"
                  value={formatDate(currentOffer.dateDebut)} // Formatage de la date avant de l'afficher
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Durée</label>
                <input
                  type="text"
                  name="duree"
                  value={currentOffer.duree}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rémunération</label>
                <input
                  type="text"
                  name="remuneration"
                  value={currentOffer.remuneration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-gray-500 text-white rounded-md"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-500 text-white rounded-md"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MesOffres;
