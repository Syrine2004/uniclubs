import React from 'react';
import { Plus } from 'lucide-react';
import { mockEvents } from '../data/mockData';

const ClubDetailPage = ({ club, setCurrentPage, user, setShowJoinModal }) => {
  if (!club) return <div className="p-8">Club non trouvé.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="relative h-64 md:h-80 bg-black">
        <img src={club.banner || club.image} alt={`${club.nom} banner`} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 flex items-end p-8 md:p-12">
          <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{club.nom}</h1>
              <p className="text-lg text-gray-200">Connecting tech enthusiasts and future innovators</p>
            </div>
            <button 
              onClick={setShowJoinModal}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg whitespace-nowrap"
            >
              <Plus size={20} className="inline mr-2" />
              Join this Club
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left/Main Column */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
            {/* About */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Club</h2>
              <p className="text-gray-700 leading-relaxed">
                The {club.nom} is a vibrant community of students passionate about technology, programming, and innovation. We bring together students to explore data science, cybersecurity, web development, and more.
                Whether you're a beginner or an advanced coder, we provide resources, events, and a network to help you grow.
              </p>
            </section>

            {/* Objectives */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Objectives</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {club.objectives?.map(obj => {
                  const Icon = obj.icon;
                  return (
                    <div key={obj.title} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{obj.title}</h3>
                        <p className="text-gray-600">{obj.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Leadership */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Club Leadership</h2>
              <div className="flex flex-wrap gap-6">
                {club.leadership?.map(leader => (
                  <div key={leader.name} className="flex items-center gap-4">
                    <img src={leader.avatar} alt={leader.name} className="w-16 h-16 rounded-full" />
                    <div>
                      <h3 className="text-lg font-semibold">{leader.name}</h3>
                      <p className="text-indigo-600 font-medium">{leader.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {mockEvents.filter(e => e.clubId === club.id).map(event => (
                  <div key={event.id}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">{event.titre}</h3>
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{event.tag}</span>
                    </div>
                    <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString('fr-FR')} • {event.lieu}</p>
                  </div>
                ))}
              </div>
              <button className="text-sm text-indigo-600 font-medium mt-6">View All Events →</button>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
              <div className="grid grid-cols-2 gap-2">
                {club.photoGallery?.map((img, index) => (
                  <img key={index} src={img} alt={`Gallery ${index+1}`} className="rounded-md h-24 w-full object-cover" />
                ))}
              </div>
              <button className="text-sm text-indigo-600 font-medium mt-6">View All Photos →</button>
            </div>
          </div>
        </div>

        {/* Our Members */}
        <section className="mt-12 text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Members</h2>
          <p className="text-gray-600 mb-6">Join {club.membersCount} passionate students in our growing community</p>
          <div className="flex justify-center flex-wrap gap-3">
            {club.members?.map((member, index) => (
              <img key={index} src={member.avatar} alt="member" className="w-12 h-12 rounded-full border-2 border-white" />
            ))}
            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-sm">
              +{club.membersCount - (club.members?.length || 0)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClubDetailPage;