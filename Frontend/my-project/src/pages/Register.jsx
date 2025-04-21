import { Link } from "react-router-dom";
import { FaBriefcase, FaUserGraduate } from 'react-icons/fa';

const Register = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="px-4 py-4 flex justify-between items-center">
          <div className="text-3xl font-semibold text-blue-600">EmploiPlus</div>
          <ul className="flex space-x-6 font-medium">
            <li><Link to="/" className="text-gray-700 hover:text-blue-600">Accueil</Link></li>
            <li><Link to="/#recherche" className="text-gray-700 hover:text-blue-600">Recherche</Link></li>
          </ul>
          <div className="space-x-4">
            <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Connexion</Link>
            <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Inscription</Link>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 px-4 py-8 pt-[100px]">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center leading-tight">
          <span className="text-violet-600">EmploiPlus</span>, votre tremplin vers l’avenir
        </h1>
        <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Rejoignez une plateforme innovante qui connecte les <strong>talents ambitieux</strong> aux <strong>entreprises visionnaires</strong>.
          Que vous recrutiez ou que vous cherchiez le stage de vos rêves, EmploiPlus simplifie votre parcours.
        </p>

        <p className="text-lg text-gray-600 mb-12 text-center max-w-xl">
          Lancez votre expérience en quelques clics. Sélectionnez votre profil pour commencer :
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Bouton Recruteur */}
          <Link
            to="/register/recruteur"
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
          >
            <FaBriefcase className="text-2xl mr-3" />
            Je suis recruteur
          </Link>

          {/* Bouton Candidat */}
          <Link
            to="/register/candidat"
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
          >
            <FaUserGraduate className="text-2xl mr-3" />
            Je suis candidat
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
