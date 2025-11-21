import React, { useState, useEffect } from 'react';

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
import Footer from './components/Footer.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // 1. Au chargement de l'app, on vérifie si un token existe déjà
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:4000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Session expirée');
      })
      .then(data => {
        setUser(data.user);
      })
      .catch(() => {
        // Si le token est invalide, on nettoie
        localStorage.removeItem('token');
        setUser(null);
      });
    }
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setShowLoginModal(false);
    // Redirige l'admin vers son dashboard
    if (loggedInUser.role === 'ADMIN') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleClubClick = (club) => {
    setSelectedClub(club);
    setCurrentPage('club-detail');
  };

  const handleJoinClick = () => {
    if (user) {
      setShowJoinModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const renderPage = () => {
    // Le dashboard admin a sa propre navbar
    if (currentPage === 'admin-dashboard') {
      return <AdminDashboard user={user} setCurrentPage={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'home':
        return <ClubsListPage setCurrentPage={setCurrentPage} setSelectedClub={handleClubClick} />;
      case 'club-detail':
        return <ClubDetailPage club={selectedClub} setCurrentPage={setCurrentPage} user={user} setShowJoinModal={handleJoinClick} />;
      case 'student-profile':
        return <StudentProfilePage user={user} />;
      case 'events':
        return <EventsPage />;
      default:
        return <ClubsListPage setCurrentPage={setCurrentPage} setSelectedClub={handleClubClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* La Navbar n'est pas affichée pour l'admin dashboard */}
      {currentPage !== 'admin-dashboard' && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          user={user} 
          setUser={setUser} 
          setShowLoginModal={() => setShowLoginModal(true)} 
        />
      )}
      
      {/* Contenu principal */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Le Footer n'est pas affiché pour l'admin dashboard */}
      {currentPage !== 'admin-dashboard' && (
        // 👇 C'EST ICI QUE J'AI AJOUTÉ LA FONCTION DE NAVIGATION
        <Footer setCurrentPage={setCurrentPage} />
      )}

      {/* Modales */}
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