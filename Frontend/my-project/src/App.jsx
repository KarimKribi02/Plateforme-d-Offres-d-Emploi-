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
// candidatureDetail
import HomeCandidat from './pages/candidat/HomeCandidat';
import OffresCandidat from './pages/candidat/OffresCandidat';
import ProfilCandidat from './pages/candidat/ProfilCandidat';
import OffreDetailCandidat from './pages/candidat/OffreDetailCandidat';
// Auth
import Login from './pages/auth/Login';
import RegisterCandidat from './pages/auth/RegisterCandidat';


function App() {
  return (
    <Router>
      <Routes>
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
  <Route index element={<HomeCandidat />} />
  <Route path="offres" element={<OffresCandidat />} />
  <Route path="offres/:id" element={<OffreDetailCandidat />} />
  <Route path="profil" element={<ProfilCandidat />} />
</Route>
      </Routes>
    </Router>
  );
}

export default App;
