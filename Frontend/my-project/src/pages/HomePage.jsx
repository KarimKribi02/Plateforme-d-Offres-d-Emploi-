import React from 'react';
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">


      {/* Slogan avec image de fond */}
      <section
        className="text-center bg-cover bg-center h-[400px] sm:h-[500px] lg:h-[500px] w-full flex items-center justify-center"
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
      <section className="py-16 bg-gray-50 flex-grow">
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
      <section className="py-16 bg-gray-100 flex-grow">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10">Découvrez l'avis de nos utilisateurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
                quote: 'Grâce à EmploiPlus, j’ai trouvé un emploi en une semaine ! Interface fluide et offres pertinentes.',
                author: 'Sarah M.',
                image: '/images/sarah.jpg'
              },
              {
                quote: 'Excellente plateforme, les alertes email sont super pratiques !',
                author: 'Karim L.',
                image: '/images/karim.jpg'
              },
              {
                quote: 'Très bon support, j’ai été bien accompagné dans ma recherche.',
                author: 'Fatima Z.',
                image: '/images/fatima.jpg'
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
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-center mb-10">Nos Partenaires</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <img src="/images/indeed.jpg" alt="Indeed" className="h-16 mx-auto object-contain" />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <img src="/images/linkedin.jpg" alt="LinkedIn" className="h-16 mx-auto object-contain" />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <img src="/images/workday.jpg" alt="Workday" className="h-16 mx-auto object-contain" />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <img src="/images/randstad.jpg" alt="randstad" className="h-16 mx-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche (style amélioré) */}
      <section className="py-20 bg-gray-50 flex-grow">
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
                <span className="text-blue-600 group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Pour créer un compte, cliquez sur le bouton d'inscription en haut à droite de la page et suivez les instructions.
              </p>
            </details>

            {/* Question 2 */}
            <details className="group border border-gray-200 rounded-xl p-6 transition-all hover:shadow-lg">
              <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800">
                Est-ce que l'inscription est gratuite ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Oui, l'inscription est gratuite pour tous les utilisateurs (candidats et recruteurs).
              </p>
            </details>

            {/* Question 3 */}
            <details className="group border border-gray-200 rounded-xl p-6 transition-all hover:shadow-lg">
              <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800">
                Comment postuler à une offre ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Après avoir trouvé une offre qui vous intéresse, cliquez dessus et remplissez le formulaire de candidature.
              </p>
            </details>
          </div>
        </div>
      </section>
      
     

    </div>
    </Layout>
  );
};

export default HomePage;
