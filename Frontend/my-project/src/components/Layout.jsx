// components/Layout.js
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Layout = ({ children }) => {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="text-3xl font-bold text-blue-600">EmploiPlus</div>
          <ul className="flex space-x-6 font-medium">
            <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Accueil</a></li>
            <li><a href="#recherche" className="text-gray-700 hover:text-blue-600 transition">Recherche</a></li>
          </ul>
          <div className="space-x-4">
            <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">Connexion</Link>
            <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Inscription</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-40">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-900 text-white py-10 w-full">
        <div className="px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">EmploiPlus</h3>
            <p className="text-gray-400">La plateforme qui connecte les candidats et les recruteurs efficacement.</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">À propos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Carrières</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-3">Suivez-nous</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaFacebookF /></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
          &copy; 2025 EmploiPlus. Tous droits réservés.
        </div>
      </footer>
    </>
  );
};

export default Layout;
