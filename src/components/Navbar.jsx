import React, { useState } from 'react';
import { Menu, X, User, LogOut, Calendar, Users, Home, Bell } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, user, setUser, setShowLoginModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setMobileMenuOpen(false);
  };

  const navigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white text-gray-900 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
            <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-indigo-700 hidden sm:block">UniClubs</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
            <button onClick={() => navigate('home')} className={`hover:text-indigo-600 transition ${currentPage === 'home' && 'text-indigo-600'}`}>
              Home
            </button>
            <button onClick={() => navigate('home')} className={`hover:text-indigo-600 transition ${currentPage === 'clubs' && 'text-indigo-600'}`}>
              Clubs
            </button>
            <button onClick={() => navigate('events')} className={`hover:text-indigo-600 transition ${currentPage === 'events' && 'text-indigo-600'}`}>
              Events
            </button>
            {user && (
              <button 
                onClick={() => navigate(user.role === 'admin' ? 'admin-dashboard' : 'student-profile')} 
                className={`hover:text-indigo-600 transition ${ (currentPage === 'admin-dashboard' || currentPage === 'student-profile') && 'text-indigo-600'}`}
              >
                {user.role === 'admin' ? 'Dashboard' : 'My Profile'}
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <button className="text-gray-500 hover:text-indigo-600">
                  <Bell size={20} />
                </button>
                <button onClick={() => navigate(user.role === 'admin' ? 'admin-dashboard' : 'student-profile')}>
                  <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-full" />
                </button>
                <button onClick={handleLogout} className="text-gray-500 hover:text-indigo-600">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <button onClick={setShowLoginModal} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => navigate('home')} className="block w-full text-left py-2 hover:bg-gray-100 px-2 rounded">Home</button>
            <button onClick={() => navigate('home')} className="block w-full text-left py-2 hover:bg-gray-100 px-2 rounded">Clubs</button>
            <button onClick={() => navigate('events')} className="block w-full text-left py-2 hover:bg-gray-100 px-2 rounded">Events</button>
            {user && (
              <button onClick={() => navigate(user.role === 'admin' ? 'admin-dashboard' : 'student-profile')} className="block w-full text-left py-2 hover:bg-gray-100 px-2 rounded">
                {user.role === 'admin' ? 'Dashboard' : 'My Profile'}
              </button>
            )}
            {user ? (
              <button onClick={handleLogout} className="block w-full text-left py-2 hover:bg-gray-100 px-2 rounded">
                Déconnexion
              </button>
            ) : (
              <button onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }} className="block w-full text-left py-2 bg-indigo-600 text-white rounded font-semibold px-2">
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;