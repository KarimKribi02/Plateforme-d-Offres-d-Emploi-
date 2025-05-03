import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PostulerOffre = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  // Trouver l'offre correspondante
  const offres = [
    {
      id: 1,
      title: "Développeur Full Stack",
      company: "TechCorp",
      location: "Casablanca",
      contract: "CDI",
      companyLink: "/entreprises/techcorp"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignStudio",
      location: "Marrakech",
      contract: "Stage",
      companyLink: "/entreprises/designstudio"
    },
    {
      id: 3,
      title: "Chef de projet",
      company: "ProjectX",
      location: "Rabat",
      contract: "CDD",
      companyLink: "/entreprises/projectx"
    },
  ];

  const offre = offres.find((job) => job.id === parseInt(id));

  if (!offre) {
    return <div className="p-6">Offre non trouvée</div>;
  }

  // Fonction pour gérer l'envoi de la candidature
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Candidature soumise : ", { name, email, coverLetter });
    // Logique d'envoi de la candidature (ex: appel API)
  };

  const handleLogout = () => {
    navigate('/login');
  };
    

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-700">EmploisPlus</h1>
        <div className="flex space-x-4 items-center">
          <Link
            to="/JobOffersPage"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Rechercher
          </Link>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      {/* Formulaire de postulation */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">Postuler à l'offre de {offre.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">Nom complet</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="coverLetter">Lettre de motivation</label>
            <textarea
              id="coverLetter"
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Soumettre la candidature
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostulerOffre;
