// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import RecruteurLayout from './layouts/RecruteurLayout';
import CandidatLayout from './layouts/CandidatLayout';

// Pages Admin
import DashboardAdmin from './pages/admin/Dashboard';
import CreateCompte from './pages/admin/CreateCompte';
import OffresAdmin from './pages/admin/Offres';
import Candidatures from './pages/admin/Candidatures';

// Pages Recruteur
import DashboardRecruteur from './pages/recruteur/Dashboard';
import CreateEntreprise from './pages/recruteur/CreateEntreprise';
import CreateOffre from './pages/recruteur/CreateOffre';
import OffresRecruteur from './pages/recruteur/OffresRecruteur';
import Candidats from './pages/recruteur/Candidats';
import CandidatureDetail from './pages/recruteur/CandidatureDetail';
// Pages Candidat
import DashboardCandidat from './pages/candidat/Dashboard';
import OffresCandidat from './pages/candidat/Offres';
import MesCandidatures from './pages/candidat/MesCandidatures';
import OffreDetail from './pages/candidat/OffreDetail';
import PagePostuler from './pages/candidat/PagePostuler';


// Auth
import Login from './pages/auth/Login';
import RegisterCandidat from './pages/auth/RegisterCandidat';


// Pages générales
 import Accueil from './pages/Accueil'; // N'oublie pas de créer ce fichier
 
// import Register from './pages/auth/Register'; // Optionnel si tu as une page d'inscription générale
// import Offres from './pages/Offres'; // Optionnel si tu veux une page publique des offres

function App() {
  return (
    <Router>
      <Routes>
        {/* Accueil */}
        <Route path="/" element={<Accueil />} />
       
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register/candidat" element={<RegisterCandidat />} />


        {/* Admin */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="create-compte" element={<CreateCompte />} />
          <Route path="offres" element={<OffresAdmin />} />
          <Route path="candidatures" element={<Candidatures />} />
        </Route>

        {/* Recruteur */}
        <Route path="/recruteur/*" element={<RecruteurLayout />}>
          <Route path="dashboard" element={<DashboardRecruteur />} />
          <Route path="create-entreprise" element={<CreateEntreprise />} />
          <Route path="create-offre" element={<CreateOffre />} />
          <Route path="voir-offre" element={<OffresRecruteur />} />
          <Route path="candidats" element={<Candidats />} />
          <Route path="candidats/:id" element={<CandidatureDetail />} />

        </Route>

        {/* Candidat */}
        <Route path="/candidat/*" element={<CandidatLayout />}>
          <Route path="dashboard" element={<DashboardCandidat />} />
          <Route path="offres" element={<OffresCandidat />} />
          <Route path="mes-candidatures" element={<MesCandidatures />} />
          <Route path="offres/:id" element={<OffreDetail />} />
          <Route path="postuler/:id" element={<PagePostuler />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
