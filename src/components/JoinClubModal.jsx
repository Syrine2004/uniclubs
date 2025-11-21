import React, { useState } from 'react';
import { Users, Info, Loader } from 'lucide-react';

const JoinClubModal = ({ club, onClose }) => {
  const [motivation, setMotivation] = useState('');
  const [availability, setAvailability] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (motivation.length < 10) { // J'ai réduit à 10 pour faciliter vos tests
      alert('Veuillez écrire au moins 10 caractères pour votre motivation.');
      return;
    }
    if (!availability || !role) {
      alert('Veuillez sélectionner votre disponibilité et un rôle.');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Vous devez être connecté pour rejoindre un club.");
        onClose();
        return;
      }

      // On combine les infos dans le message car le backend attend un champ "message"
      const fullMessage = `[Role: ${role}] [Dispo: ${availability}] \n\n${motivation}`;

      const response = await fetch(`http://localhost:4000/api/clubs/${club.id}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: fullMessage })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi");
      }

      alert(`Demande envoyée avec succès au responsable de "${club.name}" !`);
      onClose();

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Rejoindre {club.name}</h2>
        <p className="text-gray-600">Rejoignez notre communauté d'étudiants passionnés</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
            Pourquoi voulez-vous nous rejoindre ? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="motivation"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="Vos motivations..."
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
            Vos disponibilités <span className="text-red-500">*</span>
          </label>
          <select
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>Sélectionnez...</option>
            <option value="weekdays">Semaine (Soirées)</option>
            <option value="weekends">Week-ends</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Rôle souhaité <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>Choisir un rôle</option>
            <option value="member">Membre général</option>
            <option value="event_planner">Organisateur d'événements</option>
            <option value="marketing">Communication / Marketing</option>
            <option value="developer">Développeur</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="w-full py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex justify-center items-center gap-2"
          >
            {isSubmitting ? <Loader className="animate-spin w-5 h-5" /> : "Envoyer la demande"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinClubModal;