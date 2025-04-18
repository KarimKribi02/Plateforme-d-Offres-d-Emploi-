import { Link } from "react-router-dom";
import { FaBriefcase, FaUserGraduate } from 'react-icons/fa';  // Importer les icônes de Font Awesome

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 px-4 py-8">
 <h1 className="text-5xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
  Rejoignez-nous sur <span className="text-violet-600">EmploiPlus</span>
</h1>
<p className="text-xl text-gray-700 mb-12 text-center max-w-lg mx-auto">
  Que vous soyez recruteur ou chercheur de stage, nous avons la solution idéale pour vous ! Explorez nos offres et boostez votre carrière.
</p>


      <div className="flex space-x-6">
        {/* Bouton Recruteur */}
        <Link
          to="/register/recruteur"
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <FaBriefcase className="text-2xl mr-3" />  {/* Icône Recruteur */}
          Recruteur
        </Link>

        {/* Bouton Candidat */}
        <Link
          to="/register/candidat"
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <FaUserGraduate className="text-2xl mr-3" />  {/* Icône Candidat */}
          Candidat
        </Link>
      </div>
    </div>
  );
};

export default Register;
