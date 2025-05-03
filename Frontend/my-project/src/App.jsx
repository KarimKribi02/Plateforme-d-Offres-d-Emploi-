import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobOffersPage from './JobOffersPage';
import JobDetailPage from './JobDetailPage';
import EntrepriseDetailPage from './EntrepriseDetailPage';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';
 import RecruteurDashboard from './RecruteurDashboard';
 import PostulerOffre from './PostulerOffre';


function App() {
  return (
    <Router>
    <Routes>
  <Route path="/login" element={<LoginPage />} />
  {/* <Route path="/register" element={<RegisterPage />} /> */}

  {/* Redirections par rôle */}
  
  <Route path="/recruteur/dashboard" element={<RecruteurDashboard />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />

  {/* Routes publiques */}
  {/* <Route path="/" element={<HomePage />} /> */}
  <Route path="/JobOffersPage" element={<JobOffersPage />} />
  <Route path="/offres/:id" element={<JobDetailPage />} />
  <Route path="/entreprises/:name" element={<EntrepriseDetailPage />} />
  <Route path="/postuler/:id" element={<PostulerOffre />} />


      </Routes>
    </Router>
  );
}

export default App;
