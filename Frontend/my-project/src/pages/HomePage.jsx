import React from 'react';
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';


const HomePage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-3xl font-semibold text-center-600">EmploiPlus</div>
          <ul className="flex space-x-6 font-medium">
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Accueil</a></li>
            <li><a href="#recherche" className="text-gray-700 hover:text-blue-600">Recherche</a></li>
          </ul>
          <div className="space-x-4">
            <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Connexion</Link>
            <a href="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Inscription</a>
          </div>
        </div>
      </nav>
      

  {/* Slogan avec image de fond */}
<section
  className="text-center bg-cover bg-center h-[400px] flex items-center justify-center"
  style={{ backgroundImage: 'url(/images/image2.jpg)' }}
>
  <div className="max-w-4xl mx-auto px-4">
    <h1 className="text-4xl font-bold mb-4 text-white">
      Trouvez l'emploi de vos rêves en quelques clics
    </h1>
    <p className="text-lg text-gray-200">
      Notre plateforme simplifie la recherche d’emploi et vous met en relation avec les meilleures entreprises.
    </p>
  </div>
</section>


      {/* Avantages de EmploiPlus */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-semibold text-center mb-10">Les avantages d’EmploiPlus</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Avantage 1 */}
      <div className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
        <div className="text-4xl mb-4 text-blue-600">⚡</div>
        <h3 className="text-xl font-semibold mb-2">Inscription rapide</h3>
        <p className="text-gray-600">Créez votre compte en quelques clics et accédez à des centaines d’offres.</p>
      </div>

      {/* Avantage 2 */}
      <div className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
        <div className="text-4xl mb-4 text-blue-600">🔒</div>
        <h3 className="text-xl font-semibold mb-2">Plateforme sécurisée</h3>
        <p className="text-gray-600">Vos données sont protégées et vos candidatures confidentielles.</p>
      </div>

      {/* Avantage 3 */}
      <div className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition">
        <div className="text-4xl mb-4 text-blue-600">📈</div>
        <h3 className="text-xl font-semibold mb-2">Suivi de candidature</h3>
        <p className="text-gray-600">Suivez vos candidatures en temps réel et recevez des notifications.</p>
      </div>
    </div>
  </div>
</section>


      {/* Avis utilisateurs avec images */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10">Découvrez l'avis de nos utilisateurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
                quote: 'Grâce à EmploiPlus, j’ai trouvé un emploi en une semaine ! Interface fluide et offres pertinentes.',
                author: 'Sarah M.',
                image: '/public/images/sarah.jpg'
              },
              {
                quote: 'Excellente plateforme, les alertes email sont super pratiques !',
                author: 'Karim L.',
                image: '/public/images/karim.jpg'
              },
              {
                quote: 'Très bon support, j’ai été bien accompagné dans ma recherche.',
                author: 'Fatima Z.',
                image: '/public/images/fatima.jpg'
              }
            ].map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow">
                <img src={review.image} alt={review.author} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="italic text-gray-600">“{review.quote}”</p>
                <p className="mt-4 font-bold text-blue-700">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Nos partenaires (style amélioré) */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-semibold text-center mb-10">Nos Partenaires</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
      <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
        <img src="/public/images/indeed.jpg" alt="Indeed" className="h-16 mx-auto object-contain" />
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
        <img src="/public/images/linkedin.jpg" alt="LinkedIn" className="h-16 mx-auto object-contain" />
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
        <img src="/public/images/workday.jpg" alt="Workday" className="h-16 mx-auto object-contain" />
      </div>
      {/* Exemple d’un quatrième partenaire fictif */}
      <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
        <img src="/public/images/randstad.jpg" alt="randstad" className="h-16 mx-auto object-contain" />
      </div>
    </div>
  </div>
</section>


{/* Comment ça marche (style amélioré) */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-semibold text-center mb-10">Comment ça marche ?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Étape 1 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition duration-300">
        <div className="text-5xl mb-4 text-blue-500">📝</div>
        <h3 className="text-xl font-semibold mb-2">1. Créez un compte</h3>
        <p className="text-gray-600">Inscrivez-vous rapidement en tant que candidat ou recruteur.</p>
      </div>

      {/* Étape 2 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition duration-300">
        <div className="text-5xl mb-4 text-green-500">🔍</div>
        <h3 className="text-xl font-semibold mb-2">2. Cherchez une offre</h3>
        <p className="text-gray-600">Utilisez notre moteur de recherche pour trouver l’offre qui vous correspond.</p>
      </div>

      {/* Étape 3 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition duration-300">
        <div className="text-5xl mb-4 text-yellow-500">🚀</div>
        <h3 className="text-xl font-semibold mb-2">3. Postulez</h3>
        <p className="text-gray-600">Envoyez votre candidature en un clic et démarrez une nouvelle aventure.</p>
      </div>

    </div>
  </div>
</section>


      {/* FAQ améliorée avec accordéon */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-semibold text-center mb-10">Questions fréquentes</h2>
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Question 1 */}
      <details className="group border border-gray-200 rounded-xl p-6 transition-all hover:shadow-lg">
        <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800">
          Comment créer un compte ?
          <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">⌄</span>
        </summary>
        <p className="mt-4 text-gray-600">Il suffit de remplir le formulaire d'inscription et de choisir votre rôle (candidat ou recruteur).</p>
      </details>

      {/* Question 2 */}
      <details className="group border border-gray-200 rounded-xl p-6 transition-all hover:shadow-lg">
        <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800">
          Comment postuler à une offre ?
          <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">⌄</span>
        </summary>
        <p className="mt-4 text-gray-600">Vous pouvez consulter les offres et postuler directement en cliquant sur "Postuler".</p>
      </details>

      {/* Question 3 (exemple supplémentaire) */}
      <details className="group border border-gray-200 rounded-xl p-6 transition-all hover:shadow-lg">
        <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800">
          Est-ce que EmploiPlus est gratuit ?
          <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">⌄</span>
        </summary>
        <p className="mt-4 text-gray-600">Oui, l'inscription et la recherche d’emploi sont totalement gratuites pour les candidats.</p>
      </details>
    </div>
  </div>
</section>


     {/* Footer amélioré */}
<footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Bloc EmploiPlus */}
    <div>
      <h3 className="text-2xl font-bold mb-2">EmploiPlus</h3>
      <p className="text-gray-400">La plateforme qui connecte les candidats et les recruteurs efficacement.</p>
    </div>

    {/* Navigation */}
    <div className="text-center md:text-left">
      <h4 className="text-lg font-semibold mb-3">Navigation</h4>
      <ul className="space-y-2">
        <li><a href="#" className="text-gray-400 hover:text-white transition">À propos</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white transition">Carrières</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
      </ul>
    </div>

{/* Réseaux sociaux */}
<div className="text-center md:text-left">
  <h4 className="text-lg font-semibold mb-3">Suivez-nous</h4>
  <div className="flex justify-center md:justify-start space-x-4">
    <a href="#" className="text-gray-400 hover:text-white transition text-xl">
      <FaFacebookF />
    </a>
    <a href="#" className="text-gray-400 hover:text-white transition text-xl">
      <FaTwitter />
    </a>
    <a href="#" className="text-gray-400 hover:text-white transition text-xl">
      <FaLinkedinIn />
    </a>
  </div>
</div>

  </div>

  <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
    &copy; 2025 EmploiPlus. Tous droits réservés.
  </div>
</footer>

    </div>
  );
};

export default HomePage;
