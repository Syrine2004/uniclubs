import React, { useState, useEffect } from 'react';
import { Plus, Calendar, MapPin, User, Loader } from 'lucide-react';

const ClubDetailPage = ({ club, setCurrentPage, user, setShowJoinModal }) => {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Si aucun club n'est sélectionné, on ne peut rien afficher
  if (!club) return <div className="p-8 text-center">Club non trouvé.</div>;

  // Récupérer les événements spécifiques à ce club
  useEffect(() => {
    const fetchClubEvents = async () => {
      try {
        // On utilise le filtre ?clubId=... que nous avons codé dans le backend
        const res = await fetch(`http://localhost:4000/api/events?clubId=${club.id}`);
        const json = await res.json();
        if (res.ok) setEvents(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchClubEvents();
  }, [club.id]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="relative h-64 md:h-80 bg-black">
        <img 
          src={club.bannerUrl || "https://via.placeholder.com/1200x400"} 
          alt={club.name} 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 flex items-end p-8 md:p-12">
          <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {club.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-2 shadow-sm">{club.name}</h1>
              <p className="text-lg text-gray-200 max-w-2xl line-clamp-2">
                {club.description}
              </p>
            </div>
            <button 
              onClick={setShowJoinModal}
              className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition shadow-lg whitespace-nowrap flex items-center gap-2"
            >
              <Plus size={20} />
              Rejoindre le club
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left/Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos du club</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {club.description}
              </p>
            </div>

            {/* Leadership (Basé sur l'admin du club) */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsable du Club</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <User size={32} />
                </div>
                <div>
                  {/* On affiche les infos de l'admin si elles existent */}
                  <h3 className="text-lg font-bold text-gray-900">
                    {club.admin ? `${club.admin.firstName} ${club.admin.lastName}` : "Administrateur"}
                  </h3>
                  <p className="text-indigo-600">Président(e) du club</p>
                  {club.admin && <p className="text-sm text-gray-500 mt-1">{club.admin.email}</p>}
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            {club.photos && club.photos.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Galerie Photos</h2>
                <div className="grid grid-cols-2 gap-4">
                  {club.photos.map((photo) => (
                    <img 
                      key={photo.id} 
                      src={photo.url} 
                      alt="Club activity" 
                      className="rounded-lg h-48 w-full object-cover hover:opacity-90 transition cursor-pointer" 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar (Events) */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Événements à venir</h2>
              
              {loadingEvents ? (
                <div className="flex justify-center py-8"><Loader className="animate-spin text-indigo-600"/></div>
              ) : events.length === 0 ? (
                <p className="text-gray-500 text-sm">Aucun événement prévu pour le moment.</p>
              ) : (
                <div className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-800 line-clamp-1">{event.title}</h3>
                        {event.tag && <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{event.tag}</span>}
                      </div>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>{new Date(event.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button onClick={() => setCurrentPage('events')} className="w-full mt-6 text-indigo-600 font-semibold text-sm hover:underline">
                Voir tous les événements →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClubDetailPage;