import React from 'react';
import { Users, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">UniClubs</span>
          </div>
          <p className="text-sm text-gray-400">Connecting students with amazing communities and passions across campus.</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white"><span className="sr-only">Facebook</span><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><span className="sr-only">Twitter</span><Twitter size={20} /></a>
            <a href="#" className="hover:text-white"><span className="sr-only">Instagram</span><Instagram size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-white transition">Browse Clubs</a></li>
            <li><a href="#" className="text-sm hover:text-white transition">Create Club</a></li>
            <li><a href="#" className="text-sm hover:text-white transition">Events Calendar</a></li>
            <li><a href="#" className="text-sm hover:text-white transition">Resources</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="text-sm hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="text-sm hover:text-white transition">Guidelines</a></li>
            <li><a href="#" className="text-sm hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail size={16} /><span>info@university.edu</span></li>
            <li className="flex items-center gap-2"><Phone size={16} /><span>(555) 123-4567</span></li>
            <li className="flex items-center gap-2"><MapPin size={16} /><span>Student Union Building, Room 205</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-500">© 2024 UniConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;