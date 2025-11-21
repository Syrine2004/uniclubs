import React from 'react';
import { Briefcase, Image, Users, Mail, Phone, User } from 'lucide-react'; // Importez Music si nécessaire
import { mockMembershipRequests, mockMyClubs } from '../data/mockData';

const StudentProfilePage = ({ user }) => {

  const getStatusChip = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">Accepted</span>;
      case 'Rejected':
        return <span className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full">Rejected</span>;
      case 'Pending':
      default:
        return <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full">Pending</span>;
    }
  };

  const getClubIcon = (clubName) => {
    if (clubName.includes('Programming')) return <Briefcase className="text-indigo-500" size={20} />;
    if (clubName.includes('Art')) return <Image className="text-green-500" size={20} />;
    // if (clubName.includes('Music')) return <Music className="text-red-500" size={20} />; 
    if (clubName.includes('Drama')) return <Users className="text-purple-500" size={20} />;
    return <Users className="text-gray-500" size={20} />;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Colonne de gauche: Profil */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-100" 
            />
            <h2 className="text-xl font-bold text-gray-900">{user.prenom} {user.nom}</h2>
            <p className="text-gray-600">{user.major}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-gray-400" />
              <span className="text-gray-700">{user.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-400" />
              <span className="text-gray-700">{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-400" />
              <span className="text-gray-700">{user.studentId}</span>
            </div>
            <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Colonne de droite: Demandes et Clubs */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Membership Requests */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Membership Requests</h2>
            <div className="space-y-4">
              {mockMembershipRequests.map(req => (
                <div key={req.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getClubIcon(req.clubName)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{req.clubName}</h3>
                      <p className="text-sm text-gray-500">Submitted {req.submitted}</p>
                    </div>
                  </div>
                  {getStatusChip(req.status)}
                </div>
              ))}
            </div>
          </div>

          {/* My Clubs */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Clubs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockMyClubs.map(club => (
                <div key={club.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getClubIcon(club.name)}
                    </div>
                    <h3 className="font-semibold">{club.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Member since {club.joined}</p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Active</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              + Join More Clubs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;