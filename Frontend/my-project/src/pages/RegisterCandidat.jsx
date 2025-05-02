import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const RegisterCandidat = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) newErrors.name = "Le nom complet est requis.";
    if (!formData.email || !emailPattern.test(formData.email)) newErrors.email = "Veuillez entrer un email valide.";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setApiError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'candidat',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      navigate('/recherche-offres');
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <Layout>
  <div className="container mx-auto px-2 py-1 max-w-3xl pt-2">
  <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
    <h2 className="text-3xl font-semibold mb-6 text-center text-violet-600">
      Créez votre compte candidat et postulez aux offres de stage
    </h2>
    <p className="text-lg text-gray-600 mb-12 text-center">
      Rejoignez notre plateforme et accédez à des offres de stage sur mesure. Remplissez vos informations et commencez à postuler aux opportunités qui correspondent à votre profil en quelques clics.
    </p>

    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Champ pour le nom complet */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-800">Nom complet</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Votre nom complet"
          required
        />
        {errors.name && <p className="text-red-600 text-sm mt-2">{errors.name}</p>}
      </div>

      {/* Champ pour l'email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Votre email"
          required
        />
        {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email}</p>}
      </div>

      {/* Champ pour le numéro de téléphone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-800">Numéro de téléphone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Votre numéro de téléphone"
          required
        />
        {errors.phone && <p className="text-red-600 text-sm mt-2">{errors.phone}</p>}
      </div>

      {/* Champ pour la spécialité */}
      <div>
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-800">Spécialité</label>
        <input
          type="text"
          id="specialty"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          className="w-full px-6 py-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Votre spécialité"
          required
        />
        {errors.specialty && <p className="text-red-600 text-sm mt-2">{errors.specialty}</p>}
      </div>

      {/* Bouton d'inscription */}
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
=======
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-4xl font-semibold mb-6 text-center text-violet-700">Inscription - Candidat</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Créez un compte pour accéder aux offres de stage.
      </p>

      {apiError && <p className="text-red-600 text-center mb-4">{apiError}</p>}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Nom complet */}
        <div>
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

        {/* Email */}
        <div>
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

        {/* Mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-800">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Mot de passe sécurisé"
            required
          />
          {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password}</p>}
        </div>

        {/* Bouton d'inscription */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-violet-600 text-white rounded-xl shadow-lg hover:bg-violet-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Chargement...' : "S'inscrire"}
          </button>
        </div>
      </form>

    </div>
  </div></div>
</Layout>

  
  );
};

export default RegisterCandidat;
