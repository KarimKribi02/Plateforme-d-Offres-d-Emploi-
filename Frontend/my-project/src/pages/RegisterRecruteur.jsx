import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';

const RegisterRecruteur = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    secteur: '',
    adresse: '',
    site_web: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Le nom de l'entreprise est requis.";
    if (!formData.description) newErrors.description = "La description est requise.";
    if (!formData.secteur) newErrors.secteur = "Le secteur est requis.";
    if (!formData.adresse) newErrors.adresse = "L'adresse est requise.";
    if (!formData.site_web) newErrors.site_web = "Le site web est requis.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);


    try {
      const response = await axios.post('http://127.0.0.1:8000/api/entreprises', {
        nom: formData.company,
        email: formData.email,
        telephone: formData.phone,
        site_web: formData.website,
        description: formData.description,
      });

      console.log("Entreprise enregistrée :", response.data);

      setLoading(false);
      navigate('/recruteur/creer-offre');

    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error.response?.data || error.message);
      alert("Une erreur est survenue lors de l'inscription.");
      setLoading(false);

    }
  };

  return (

    <Layout>
      <div className="container mx-auto px-2 py-1 max-w-3xl pt-2">
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-center text-violet-600">
            Créez votre compte recruteur et commencez à publier vos offres de stage
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Rejoignez notre plateforme et gérez facilement vos offres de stage. Remplissez les informations suivantes pour inscrire votre entreprise et commencez à publier vos offres de stage en quelques clics.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-800">Nom de l'entreprise</label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Exemple: Entreprise XYZ"
                required
              />
              {errors.company && <p className="text-red-600 text-sm mt-2">{errors.company}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email de l'entreprise</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="contact@entreprise.com"
                required
              />
              {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-800">Numéro de téléphone</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Exemple: +33 1 23 45 67 89"
                required
              />
              {errors.phone && <p className="text-red-600 text-sm mt-2">{errors.phone}</p>}
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-800">Site web de l'entreprise</label>
              <input
                type="url"
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="https://www.entreprise.com"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-800">Description de l'entreprise</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Parlez-nous de votre entreprise, de vos valeurs et de ce qui fait votre spécificité."
                required
              ></textarea>
              {errors.description && <p className="text-red-600 text-sm mt-2">{errors.description}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-4 bg-violet-600 text-white rounded-xl shadow-lg hover:bg-violet-700 transition duration-300 w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? "Chargement..." : "S'inscrire"}
              </button>
            </div>
          </form>

    
        </div>
      </div>
    </Layout>
  );
};

export default RegisterRecruteur;
