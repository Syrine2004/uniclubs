import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, Calendar, Users } from 'lucide-react';
import { mockClubs } from '../data/mockData';

const ClubsListPage = ({ setCurrentPage, setSelectedClub }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [filteredClubs, setFilteredClubs] = useState(mockClubs);

  useEffect(() => {
    const filtered = mockClubs.filter(club => {
      const matchesCategory = category === 'All Categories' || club.categorie === category;
      const matchesSearch = club.nom.toLowerCase().includes(search.toLowerCase()) ||
                            club.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredClubs(filtered);
  }, [search, category]);

  const handleClubClick = (club) => {
    setSelectedClub(club);
    setCurrentPage('club-detail');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Discover University Clubs</h1>
          <p className="text-xl text-indigo-100 mb-8">
            Join amazing communities, make lifelong friends, and explore your passions with hundreds of student organizations.
          </p>
          <div className="flex justify-center gap-8 text-lg">
            <span><CheckCircle size={20} className="inline mr-2" /> 5+ Active Clubs</span>
            <span><Calendar size={20} className="inline mr-2" /> 10+ Events Monthly</span>
            <span><Users size={20} className="inline mr-2" /> 5+ Members</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <label className="text-gray-600 font-medium">Filter by:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option>All Categories</option>
              <option>Technologie</option>
              <option>Arts</option>
              <option>Sports</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2"
          />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-gray-600 mb-6">Showing {filteredClubs.length} clubs</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredClubs.map(club => (
            <div key={club.id} onClick={() => handleClubClick(club)} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 cursor-pointer group">
              <img src={club.image} alt={club.nom} className="w-full h-40 object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{club.nom}</h3>
                <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">{club.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span><Users size={16} className="inline mr-1" /> {club.membersCount} Members</span>
                  <span><Calendar size={16} className="inline mr-1" /> {club.eventsCount} Events</span>
                </div>
                <button className="w-full bg-white text-indigo-600 border border-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition font-semibold group-hover:bg-indigo-600 group-hover:text-white">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Load More Clubs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubsListPage;