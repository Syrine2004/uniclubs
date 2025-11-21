import React, { useState } from 'react';
import { Briefcase, Mail, Phone, User as UserIcon, Clock, CheckCircle, XCircle, Camera, Loader } from 'lucide-react';

const StudentProfilePage = ({ user }) => {
  const [uploading, setUploading] = useState(false);

  // Si l'utilisateur n'est pas encore chargé
  if (!user) return <div className="p-8 text-center">Chargement du profil...</div>;

  // --- 1. NOUVELLE FONCTION POUR AVOIR LA MÊME IMAGE QUE LA NAVBAR ---
  const getProfileImage = () => {
    if (user.avatarUrl) return user.avatarUrl;
    // On utilise le même générateur que la Navbar pour avoir les mêmes couleurs
    return `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&color=fff`;
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const uploadRes = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (uploadRes.ok) {
        const updateRes = await fetch('http://localhost:4000/api/auth/me', {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ avatarUrl: uploadData.url })
        });

        if (updateRes.ok) {
          alert("Photo mise à jour !");
          window.location.reload();
        }
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'APPROVED': return <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"><CheckCircle size={14}/> Accepté</span>;
      case 'REJECTED': return <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium"><XCircle size={14}/> Refusé</span>;
      default: return <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium"><Clock size={14}/> En attente</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Colonne Gauche : Infos Perso */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center relative">
            
            {/* Zone Photo */}
            <div className="relative w-28 h-28 mx-auto mb-4 group">
              {/* --- 2. MODIFICATION ICI : ON UTILISE L'IMAGE DYNAMIQUE --- */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={getProfileImage()} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 shadow-lg transition transform hover:scale-110">
                {uploading ? <Loader size={16} className="animate-spin"/> : <Camera size={16} />}
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} />
              </label>
            </div>

            <h2 className="text-xl font-bold text-gray-900 capitalize">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-600">{user.major || "Étudiant"}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={20} className="text-gray-400" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <UserIcon size={20} className="text-gray-400" />
              <span>{user.studentId || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Inchangée */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Historique des demandes</h2>
            <div className="space-y-4">
              {user.membershipRequests?.length === 0 && <p className="text-gray-500 text-sm">Aucune demande récente.</p>}
              {user.membershipRequests?.map(req => (
                <div key={req.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{req.club.name}</h3>
                    <p className="text-sm text-gray-500">Envoyé le {new Date(req.createdAt).toLocaleDateString()}</p>
                  </div>
                  {getStatusChip(req.status)}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mes Clubs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.memberships?.length === 0 && <p className="text-gray-500 text-sm">Vous n'êtes membre d'aucun club pour le moment.</p>}
              {user.memberships?.map(membership => (
                <div key={membership.id} className="p-4 border border-gray-200 rounded-lg flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{membership.club.name}</h3>
                    <p className="text-xs text-gray-500">Membre depuis {new Date(membership.joinedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;