import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterCandidat = () => {
  const navigate = useNavigate(); // Hook de redirection

  // État du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cv: null,
    specialty: '',
  });

  const [loading, setLoading] = useState(false); // État de chargement
  const [errors, setErrors] = useState({}); // Erreurs de validation

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    const phonePattern = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) newErrors.name = "Le nom complet est requis.";
    if (!formData.email || !emailPattern.test(formData.email)) newErrors.email = "Veuillez entrer un email valide.";
    if (!formData.phone || !phonePattern.test(formData.phone)) newErrors.phone = "Veuillez entrer un numéro de téléphone valide.";
    if (!formData.specialty) newErrors.specialty = "La spécialité est requise.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Ne soumettre pas si le formulaire est invalide

    setLoading(true); // Afficher le chargement

    // Simuler un envoi de données (API)
    setTimeout(() => {
      setLoading(false);
      navigate('/recherche-offres'); // Rediriger après l'envoi
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-4xl font-semibold mb-6 text-center text-violet-700">Inscription - Candidat</h2>
      <p className="text-lg text-gray-600 mb-12 text-center">
        Rejoignez notre plateforme et postulez à des offres de stage adaptées à votre profil.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Champ pour le nom complet */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-800">Nom complet</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Votre nom complet"
            required
          />
          {errors.name && <p className="text-red-600 text-sm mt-2">{errors.name}</p>}
        </div>

        {/* Champ pour l'email */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Votre email"
            required
          />
          {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email}</p>}
        </div>

        {/* Champ pour le numéro de téléphone */}
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-800">Numéro de téléphone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Votre numéro de téléphone"
            required
          />
          {errors.phone && <p className="text-red-600 text-sm mt-2">{errors.phone}</p>}
        </div>

        {/* Champ pour la spécialité */}
        <div className="mb-6">
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-800">Spécialité</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Votre spécialité"
            required
          />
          {errors.specialty && <p className="text-red-600 text-sm mt-2">{errors.specialty}</p>}
        </div>

        {/* Bouton d'inscription */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-violet-600 text-white rounded-xl shadow-lg hover:bg-violet-700 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="loader">Chargement...</span>
            ) : (
              "S'inscrire"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCandidat;
