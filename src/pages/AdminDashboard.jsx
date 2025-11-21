import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, LayoutGrid, Plus, CheckCircle, XCircle, Loader, 
  Edit, Trash2, X, Save, Image as ImageIcon, Upload, Home, LogOut // <--- J'ai ajouté Home et LogOut
} from 'lucide-react';

// ... (Le composant ImageUpload reste identique, je ne le répète pas pour gagner de la place, gardez-le !) ...
const ImageUpload = ({ label, currentUrl, onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        onUpload(data.url);
      } else {
        alert('Erreur upload');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur serveur');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center gap-4">
        {currentUrl && (
          <img src={currentUrl} alt="Preview" className="w-16 h-16 object-cover rounded border" />
        )}
        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition">
          {uploading ? <Loader className="animate-spin" size={20}/> : <Upload size={20}/>}
          <span>{currentUrl ? "Changer l'image" : "Ajouter une image"}</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
      </div>
    </div>
  );
};

// 👇 AJOUTEZ 'setCurrentPage' DANS LES PROPS ICI
const AdminDashboard = ({ user, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('Requests');
  const [loading, setLoading] = useState(false);
  
  const [requests, setRequests] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);

  // Modals & Forms (Code identique à avant)
  const [showClubModal, setShowClubModal] = useState(false);
  const [isEditingClub, setIsEditingClub] = useState(false);
  const [currentClubId, setCurrentClubId] = useState(null);
  const [clubForm, setClubForm] = useState({ name: '', category: '', description: '', bannerUrl: '', logoUrl: '' });
  const [clubPhotos, setClubPhotos] = useState([]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [eventForm, setEventForm] = useState({ title: '', description: '', startDate: '', location: '', tag: '', clubId: '' });

  useEffect(() => {
    if (activeTab === 'Requests') fetchRequests();
    if (activeTab === 'Clubs') fetchClubs();
    if (activeTab === 'Events') { fetchEvents(); fetchClubs(); }
  }, [activeTab]);

  // --- API GET ---
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/memberships', { headers: { 'Authorization': `Bearer ${token}` } });
      const json = await res.json(); if (res.ok) setRequests(json.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };
  const fetchClubs = async () => {
    try { const res = await fetch('http://localhost:4000/api/clubs'); const json = await res.json(); if (res.ok) setClubs(json.data); } catch (err) { console.error(err); }
  };
  const fetchEvents = async () => {
    setLoading(true); try { const res = await fetch('http://localhost:4000/api/events'); const json = await res.json(); if (res.ok) setEvents(json.data); } catch (err) { console.error(err); } setLoading(false);
  };

  // --- ACTIONS CLUB ---
  const handleSaveClub = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = isEditingClub ? `http://localhost:4000/api/clubs/${currentClubId}` : 'http://localhost:4000/api/clubs';
      const method = isEditingClub ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(clubForm)
      });

      if (res.ok) {
        const savedClub = await res.json();
        const targetId = isEditingClub ? currentClubId : savedClub.data.id;

        if (clubPhotos.length > 0 || isEditingClub) {
          await fetch(`http://localhost:4000/api/clubs/${targetId}/photos`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ photos: clubPhotos })
          });
        }
        setShowClubModal(false); fetchClubs(); resetClubForm();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteClub = async (id) => {
    if (!window.confirm("Supprimer ce club ?")) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:4000/api/clubs/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      fetchClubs();
    } catch (err) { console.error(err); }
  };

  // --- ACTIONS EVENT ---
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      let url, method;
      if (isEditingEvent) {
        url = `http://localhost:4000/api/events/${currentEventId}`;
        method = 'PATCH';
      } else {
        url = `http://localhost:4000/api/events/club/${eventForm.clubId}`;
        method = 'POST';
      }
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(eventForm)
      });
      if (res.ok) {
        setShowEventModal(false);
        fetchEvents();
        setEventForm({ title: '', description: '', startDate: '', location: '', tag: '', clubId: '' });
      } else { alert("Erreur lors de l'enregistrement"); }
    } catch (err) { console.error(err); }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Supprimer cet événement ?")) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:4000/api/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchEvents();
    } catch (err) { console.error(err); }
  };

  const handleRequestStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:4000/api/memberships/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      fetchRequests();
    } catch (err) { alert("Erreur"); }
  };

  // --- HELPERS ---
  const resetClubForm = () => { setClubForm({ name: '', category: '', description: '', bannerUrl: '', logoUrl: '' }); setClubPhotos([]); setIsEditingClub(false); };
  const openEditClub = (club) => { setClubForm({ ...club, bannerUrl: club.bannerUrl || '', logoUrl: club.logoUrl || '' }); setClubPhotos(club.photos || []); setIsEditingClub(true); setCurrentClubId(club.id); setShowClubModal(true); };
  const handleAddGalleryPhoto = (url) => { setClubPhotos([...clubPhotos, { url }]); };
  const openEditEvent = (event) => {
    setEventForm({
      title: event.title, description: event.description,
      startDate: event.startDate.split('T')[0], location: event.location,
      tag: event.tag || '', clubId: event.clubId
    });
    setIsEditingEvent(true); setCurrentEventId(event.id); setShowEventModal(true);
  };

  const pendingCount = requests.filter(r => r.status === 'PENDING').length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex-shrink-0 hidden md:flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Admin Panel</h2>
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab('Requests')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${activeTab === 'Requests' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Users size={20} /> <span>Demandes</span>
            {pendingCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{pendingCount}</span>}
          </button>
          <button onClick={() => setActiveTab('Clubs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${activeTab === 'Clubs' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <LayoutGrid size={20} /> <span>Gérer les Clubs</span>
          </button>
          <button onClick={() => setActiveTab('Events')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${activeTab === 'Events' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Calendar size={20} /> <span>Gérer les Événements</span>
          </button>
        </nav>

        {/* 👇 NOUVEAU BOUTON RETOUR AU SITE 👇 */}
        <div className="border-t pt-4 mt-4 space-y-2">
          <button 
            onClick={() => setCurrentPage('home')} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 border border-gray-200"
          >
            <Home size={20} /> <span>Retour au site</span>
          </button>
        </div>
      </div>

      {/* Le reste du contenu (inchangé) */}
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === 'Requests' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion des adhésions</h1>
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              {requests.length === 0 && <p>Aucune demande.</p>}
              {requests.map(req => (
                <div key={req.id} className="border p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{req.user.firstName} {req.user.lastName}</h3>
                    <p className="text-sm text-gray-600">veut rejoindre : <strong>{req.club.name}</strong></p>
                    <p className="text-xs text-gray-500 italic mt-1">"{req.message}"</p>
                  </div>
                  <div className="flex gap-2">
                    {req.status === 'PENDING' ? (
                      <>
                        <button onClick={() => handleRequestStatus(req.id, 'APPROVED')} className="bg-green-100 text-green-700 p-2 rounded"><CheckCircle size={20}/></button>
                        <button onClick={() => handleRequestStatus(req.id, 'REJECTED')} className="bg-red-100 text-red-700 p-2 rounded"><XCircle size={20}/></button>
                      </>
                    ) : <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100">{req.status}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Clubs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Mes Clubs</h1>
              <button onClick={() => { resetClubForm(); setShowClubModal(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                <Plus size={20}/> Nouveau
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {clubs.map(club => (
                <div key={club.id} className="bg-white rounded shadow overflow-hidden">
                  <img src={club.bannerUrl || "/placeholder.jpg"} className="h-32 w-full object-cover"/>
                  <div className="p-4">
                    <h3 className="font-bold">{club.name}</h3>
                    <div className="mt-4 flex justify-end gap-2">
                      <button onClick={() => openEditClub(club)} className="text-blue-600 p-2 hover:bg-blue-50 rounded"><Edit size={18}/></button>
                      <button onClick={() => handleDeleteClub(club.id)} className="text-red-600 p-2 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Gérer les Événements</h1>
              <button onClick={() => { setEventForm({title:'', description:'', startDate:'', location:'', tag:'', clubId:''}); setIsEditingEvent(false); setShowEventModal(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                <Plus size={20}/> Nouvel Événement
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {events.map(event => (
                <div key={event.id} className="bg-white p-6 rounded-lg shadow flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-500">Club: {event.club?.name} • {new Date(event.startDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditEvent(event)} className="text-blue-600 p-2 bg-blue-50 rounded"><Edit size={20}/></button>
                    <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600 p-2 bg-red-50 rounded"><Trash2 size={20}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL CLUB AMÉLIORÉ */}
      {showClubModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-6"><h2 className="text-2xl font-bold">{isEditingClub ? 'Modifier' : 'Créer'}</h2><button onClick={() => setShowClubModal(false)}><X size={24}/></button></div>
            
            <form onSubmit={handleSaveClub} className="space-y-4">
              <input required placeholder="Nom" className="w-full border p-2 rounded" value={clubForm.name} onChange={e => setClubForm({...clubForm, name: e.target.value})} />
              <input required placeholder="Catégorie" className="w-full border p-2 rounded" value={clubForm.category} onChange={e => setClubForm({...clubForm, category: e.target.value})} />
              <textarea required placeholder="Description" className="w-full border p-2 rounded h-24" value={clubForm.description} onChange={e => setClubForm({...clubForm, description: e.target.value})} />
              
              <div className="grid grid-cols-2 gap-4">
                <ImageUpload label="Logo du Club" currentUrl={clubForm.logoUrl} onUpload={(url) => setClubForm({...clubForm, logoUrl: url})} />
                <ImageUpload label="Bannière" currentUrl={clubForm.bannerUrl} onUpload={(url) => setClubForm({...clubForm, bannerUrl: url})} />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-3">Galerie Photos</h3>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {clubPhotos.map((p, i) => (
                    <div key={i} className="relative"><img src={p.url} className="h-16 w-full object-cover rounded"/><button type="button" onClick={() => setClubPhotos(clubPhotos.filter((_, idx) => idx !== i))} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"><X size={10}/></button></div>
                  ))}
                </div>
                <ImageUpload label="Ajouter une photo à la galerie" currentUrl="" onUpload={handleAddGalleryPhoto} />
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded font-bold">Sauvegarder</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EVENT */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <div className="flex justify-between mb-6"><h2 className="text-2xl font-bold">Gestion Événement</h2><button onClick={() => setShowEventModal(false)}><X size={24}/></button></div>
            <form onSubmit={handleSaveEvent} className="space-y-4">
              {!isEditingEvent && (
                <select required className="w-full border p-2 rounded" value={eventForm.clubId} onChange={e => setEventForm({...eventForm, clubId: e.target.value})}>
                  <option value="">Choisir le club...</option>
                  {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              )}
              <input required placeholder="Titre" className="w-full border p-2 rounded" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} />
              <input required type="date" className="w-full border p-2 rounded" value={eventForm.startDate} onChange={e => setEventForm({...eventForm, startDate: e.target.value})} />
              <input required placeholder="Lieu" className="w-full border p-2 rounded" value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} />
              <textarea required placeholder="Description" className="w-full border p-2 rounded h-24" value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} />
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded font-bold">Sauvegarder</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;