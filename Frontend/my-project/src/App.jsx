import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterRecruteur from "./pages/RegisterRecruteur";  // Page pour le recruteur
import RegisterCandidat from "./pages/RegisterCandidat"; 
import CreerOffre from './recruteur/CreerOffre'; // à créer
import MesOffres from './recruteur/MesOffres';
import RechercheOffres from './candidature/RechercheOffres';

import  CandidatureForm from "./candidature/CandidatureForm"; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/register/recruteur" element={<RegisterRecruteur />} />
        <Route path="/register/candidat" element={<RegisterCandidat />} />
        <Route path="/recruteur/creer-offre" element={<CreerOffre />} />
        <Route path="/recruteur/mes-offres" element={<MesOffres />} />
        <Route path="/recherche-offres" element={<RechercheOffres />} />
        <Route path="/Candidature" element={<CandidatureForm />} />
   

        {/* D'autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;
