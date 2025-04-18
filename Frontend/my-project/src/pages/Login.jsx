import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Partie gauche : Bienvenue */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-600 text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Bienvenue sur EmploiPlus</h2>
          <p className="text-center text-lg">
            La plateforme qui connecte les talents aux meilleures opportunités. Rejoignez-nous dès maintenant !
          </p>
        </div>

        {/* Partie droite : Connexion */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Connexion</h2>

          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="exemple@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Se connecter
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Vous n'avez pas de compte ?
            <a href="/register" className="text-blue-600 hover:underline ml-1">Créer un compte</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
