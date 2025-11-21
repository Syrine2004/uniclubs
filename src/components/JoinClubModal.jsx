import React, { useState } from 'react';
import { Users, Info } from 'lucide-react';

const JoinClubModal = ({ club, onClose }) => {
  const [motivation, setMotivation] = useState('');
  const [availability, setAvailability] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (motivation.length < 50) {
      alert('Veuillez écrire au moins 50 caractères pour votre motivation.');
      return;
    }
    if (!availability || !role) {
      alert('Veuillez sélectionner votre disponibilité et un rôle.');
      return;
    }
    alert(`Demande d'adhésion pour "${club.nom}" envoyée !`);
    onClose();
  };

  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Student Club</h2>
        <p className="text-gray-600">Join our community of passionate students</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
            Tell us why you want to join <span className="text-red-500">*</span>
          </label>
          <textarea
            id="motivation"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="Minimum 50 characters"
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500"
          />
          <p className={`text-xs mt-1 ${motivation.length < 50 ? 'text-gray-400' : 'text-green-600'}`}>
            {motivation.length} / 50 characters
          </p>
        </div>

        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
            When are you available? <span className="text-red-500">*</span>
          </label>
          <select
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>Select your availability</option>
            <option value="weekdays">Weekdays evenings</option>
            <option value="weekends">Weekends</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            What role interests you most? <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>Choose a role</option>
            <option value="member">General Member</option>
            <option value="event_planner">Event Planner</option>
            <option value="marketing">Marketing/Social Media</option>
            <option value="developer">Developer (for tech clubs)</option>
          </select>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info size={20} />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">What happens next?</h3>
              <p className="text-sm">We'll review your application and get back to you within 3-5 business days via email.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="w-full py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinClubModal;