import React, { useState } from 'react';
import { 
  Users, Calendar, Image, Settings, Plus, Clock, Check, 
  BarChart, Mail, CheckCircle, XCircle 
} from 'lucide-react';
import { mockAdminRequests } from '../data/mockData';

const AdminDashboard = ({ user }) => {
  const [requests, setRequests] = useState(mockAdminRequests);
  const [activeTab, setActiveTab] = useState('Requests');

  const handleRequest = (id, action) => {
    alert(`Request ${id} ${action}`);
    setRequests(requests.map(r => r.id === id ? {...r, status: action} : r));
  };

  const pendingCount = requests.filter(r => r.status === 'Pending').length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Club Admin</h2>
        <nav className="space-y-2">
          {[
            { name: 'Requests', icon: Users },
            { name: 'Events', icon: Calendar },
            { name: 'Photos', icon: Image },
            { name: 'Settings', icon: Settings },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
                {item.name === 'Requests' && pendingCount > 0 && (
                  <span className="ml-auto bg-indigo-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <img src={user.avatar} alt="Admin" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold text-gray-800">{user.prenom} {user.nom}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Review and Manage Requests</h1>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2">
            <Plus size={18} />
            Add New Event
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <Check size={24} />
            </div>
            <div>
              <p className="text-gray-600">Approved Today</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-gray-600">Total Members</p>
              <p className="text-3xl font-bold text-gray-900">247</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <BarChart size={24} />
            </div>
            <div>
              <p className="text-gray-600">Active Events</p>
              <p className="text-3xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>

        {/* Recent Requests Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Requests</h2>
          <div className="space-y-6">
            {requests.map(req => (
              <div key={req.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <img src={req.avatar} alt={req.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{req.name}</h3>
                      <p className="text-sm text-gray-600">{req.class}</p>
                      <p className="text-sm text-indigo-600 flex items-center gap-1 mt-1">
                        <Mail size={14} /> {req.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-gray-500">{req.time}</span>
                    {req.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleRequest(req.id, 'Rejected')}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                        >
                          Reject
                        </button>
                        <button 
                          onClick={() => handleRequest(req.id, 'Approved')}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm font-medium"
                        >
                          Accept
                        </button>
                      </div>
                    )}
                    {req.status === 'Approved' && (
                      <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                        <CheckCircle size={16} /> Approved
                      </span>
                    )}
                     {req.status === 'Rejected' && (
                      <span className="text-sm font-medium text-red-600 flex items-center gap-1">
                        <XCircle size={16} /> Rejected
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md mt-4 ml-16">
                  "{req.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;