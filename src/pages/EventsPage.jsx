import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Loader } from 'lucide-react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin"/></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8">Événements à venir</h1>
        
        {events.length === 0 ? (
          <p className="text-center text-gray-500">Aucun événement prévu pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {event.tag && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block bg-indigo-100 text-indigo-700">
                          {event.tag}
                        </span>
                      )}
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">Organisé par {event.club?.name}</p>
                    </div>
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={16} />
                      <span>{new Date(event.startDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;