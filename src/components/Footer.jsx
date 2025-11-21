import React from 'react';
import { Users, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  
  const handleNav = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      {/* On passe de grid-cols-4 à grid-cols-3 car on enlève une colonne */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <button 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
          >
            <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">UniClubs</span>
          </button>
          <p className="text-sm text-gray-400">Connecting students with amazing communities and passions across campus.</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white transition"><span className="sr-only">Facebook</span><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition"><span className="sr-only">Twitter</span><Twitter size={20} /></a>
            <a href="#" className="hover:text-white transition"><span className="sr-only">Instagram</span><Instagram size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <button onClick={() => handleNav('clubs')} className="text-sm hover:text-white transition text-left">
                Browse Clubs
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('events')} className="text-sm hover:text-white transition text-left">
                Events Calendar
              </button>
            </li>
          
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail size={16} /><span>isetnabeul@gamil.com</span></li>
            <li className="flex items-center gap-2"><Phone size={16} /><span>(216)72 444 222</span></li>
            <li className="flex items-center gap-2"><MapPin size={16} /><span>Nabeul,Tunisia</span></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-500">© 2025 UniClubs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;