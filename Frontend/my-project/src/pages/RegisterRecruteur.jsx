import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterRecruteur = () => {
  const navigate = useNavigate(); // Hook de redirection

  // État du formulaire
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    phone: '',
    website: '',
    description: '',
  });
  
  const [loading, setLoading] = useState(false); // État de chargement
  const [errors, setErrors] = useState({}); // Erreurs de validation

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    const phonePattern = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.company) newErrors.company = "Le nom de l'entreprise est requis.";
    if (!formData.email || !emailPattern.test(formData.email)) newErrors.email = "Veuillez entrer un email valide.";
    if (!formData.phone || !phonePattern.test(formData.phone)) newErrors.phone = "Veuillez entrer un numéro de téléphone valide.";
    if (!formData.description) newErrors.description = "La description est requise.";

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
      navigate('/recruteur/creer-offre'); // Rediriger après l'envoi
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-4xl font-semibold mb-6 text-center text-violet-700">Inscription - Recruteur</h2>
      <p className="text-lg text-gray-600 mb-12 text-center">
        Rejoignez notre plateforme et gérez facilement vos offres de stage. Remplissez les informations suivantes pour inscrire votre entreprise.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Champ pour le nom de l'entreprise */}
        <div className="mb-6">
          <label htmlFor="company" className="block text-sm font-medium text-gray-800">Nom de l'entreprise</label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Exemple: Entreprise XYZ"
            required
          />
          {errors.company && <p className="text-red-600 text-sm mt-2">{errors.company}</p>}
        </div>

        {/* Champ pour l'email du recruteur */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email de l'entreprise</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="contact@entreprise.com"
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
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Exemple: +33 1 23 45 67 89"
            required
          />
          {errors.phone && <p className="text-red-600 text-sm mt-2">{errors.phone}</p>}
        </div>

        {/* Champ pour le site web de l'entreprise */}
        <div className="mb-6">
          <label htmlFor="website" className="block text-sm font-medium text-gray-800">Site web de l'entreprise</label>
          <input
            type="url"
            id="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="https://www.entreprise.com"
          />
        </div>

        {/* Champ pour la description de l'entreprise */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-800">Description de l'entreprise</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Parlez-nous de votre entreprise, de vos valeurs et de ce qui fait votre spécificité."
            required
          ></textarea>
          {errors.description && <p className="text-red-600 text-sm mt-2">{errors.description}</p>}
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

export default RegisterRecruteur;
