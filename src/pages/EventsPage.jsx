import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { mockEvents } from '../data/mockData';

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8">Événements à venir</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {mockEvents.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block ${
                      event.tag === 'Workshop' ? 'bg-blue-100 text-blue-700' :
                      event.tag === 'Talk' ? 'bg-green-100 text-green-700' :
                      event.tag === 'Competition' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {event.tag}
                    </span>
                    <h3 className="text-xl font-bold">{event.titre}</h3>
                  </div>
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={16} />
                    <span>{event.lieu}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  S'inscrire à l'événement
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;