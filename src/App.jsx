import React, { useState } from 'react';

// Importez vos composants et pages
import Navbar from './components/Navbar.jsx';
import Modal from './components/Modal.jsx';
import LoginModal from './components/LoginModal.jsx';
import JoinClubModal from './components/JoinClubModal.jsx';
import ClubsListPage from './pages/ClubsListPage.jsx';
import ClubDetailPage from './pages/ClubDetailPage.jsx';
import StudentProfilePage from './pages/StudentProfilePage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import EventsPage from './pages/EventsPage.jsx';
import Footer from './components/Footer.jsx'; // Importez le Footer

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null); // L'utilisateur connecté
  const [selectedClub, setSelectedClub] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Gère la réussite de la connexion
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setShowLoginModal(false);
    // Redirige l'admin vers son dashboard, l'étudiant reste sur la page d'accueil
    if (loggedInUser.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  // Gère le clic sur un club
  const handleClubClick = (club) => {
    setSelectedClub(club);
    setCurrentPage('club-detail');
  };

  // Gère le clic sur "Rejoindre"
  const handleJoinClick = () => {
    if (user) {
      setShowJoinModal(true); // Ouvre la modale d'adhésion si connecté
    } else {
      setShowLoginModal(true); // Ouvre la modale de connexion si non connecté
    }
  };

  // Affiche la page principale
  const renderPage = () => {
    // Le dashboard admin a sa propre navbar, donc on ne rend pas la navbar principale
    if (currentPage === 'admin-dashboard') {
      return <AdminDashboard user={user} />;
    }

    switch (currentPage) {
      case 'home':
        return <ClubsListPage setCurrentPage={setCurrentPage} setSelectedClub={handleClubClick} />;
      case 'club-detail':
        return <ClubDetailPage club={selectedClub} setCurrentPage={setCurrentPage} user={user} setShowJoinModal={handleJoinClick} />;
      case 'student-profile': // Changé de 'student-dashboard'
        return <StudentProfilePage user={user} />;
      case 'events':
        return <EventsPage />;
      default:
        return <ClubsListPage setCurrentPage={setCurrentPage} setSelectedClub={handleClubClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* La Navbar n'est pas affichée pour l'admin dashboard car il a la sienne */}
      {currentPage !== 'admin-dashboard' && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          user={user} 
          setUser={setUser} 
          setShowLoginModal={() => setShowLoginModal(true)} 
        />
      )}
      
      {/* 'main' et 'flex-grow' permettent au contenu de pousser le footer en bas */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Le Footer n'est pas affiché pour l'admin dashboard */}
      {currentPage !== 'admin-dashboard' && (
        <Footer />
      )}

      {/* Affichage des modales par-dessus la page */}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginModal 
            onClose={() => setShowLoginModal(false)} 
            setUser={handleLoginSuccess} 
          />
        </Modal>
      )}

      {showJoinModal && selectedClub && (
        <Modal onClose={() => setShowJoinModal(false)}>
          <JoinClubModal 
            club={selectedClub} 
            onClose={() => setShowJoinModal(false)} 
          />
        </Modal>
      )}
    </div>
  );
}