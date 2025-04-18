import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function CandidatureForm() {
  const location = useLocation();
  const offre = location.state?.offre;
  
  const [cvFile, setCvFile] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
  };

  if (!offre) {
    return <p>Aucune offre sélectionnée.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CV File:", cvFile);
    console.log("Nom complet:", e.target[0].value);
    console.log("Email:", e.target[1].value);
    console.log("Message:", e.target[2].value);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-violet-700 mb-6">Candidature pour : {offre.title}</h2>
      <p className="text-lg text-center mb-6"><strong>Entreprise :</strong> {offre.company}</p>
      <p className="text-gray-600 text-center mb-8">{offre.description}</p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-800">Nom complet</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Votre nom"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Votre email"
            required
          />
        </div>

        {/* Section pour télécharger le CV */}
        <div>
          <label htmlFor="cv" className="block text-sm font-medium text-gray-800">Téléchargez votre CV</label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">Message / Motivation</label>
          <textarea
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows="4"
            placeholder="Votre message"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-violet-600 text-white rounded-xl shadow-lg hover:bg-violet-700 transition duration-300"
        >
          Envoyer la candidature
        </button>
      </form>
    </div>
  );
}

export default CandidatureForm;
