import React, { useEffect, useState } from 'react';
import { Bell, X, Check, Info } from 'lucide-react';

const NotificationsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fonction pour récupérer les notifications depuis le serveur
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:4000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      
      if (res.ok) {
        setNotifications(json.data);
        // Compter combien ne sont pas lues
        setUnreadCount(json.data.filter(n => n.status === 'UNREAD').length);
      }
    } catch (err) { console.error(err); }
  };

  // Charger au démarrage et toutes les 15 secondes (pour le temps réel)
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  // Marquer une notification comme "Lue"
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:4000/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      // Mise à jour locale pour que la puce rouge disparaisse
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'READ' } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="relative">
      {/* Le bouton Cloche */}
      <button onClick={() => setIsOpen(!isOpen)} className="relative text-gray-500 hover:text-indigo-600 p-2 transition">
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Le Menu Déroulant */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Notifications</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-sm">
                <Info className="w-8 h-8 mx-auto mb-2 opacity-50"/>
                Aucune notification
              </div>
            ) : (
              notifications.map(notif => (
                <div key={notif.id} className={`p-4 border-b hover:bg-gray-50 transition ${notif.status === 'UNREAD' ? 'bg-indigo-50/50' : ''}`}>
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h4 className={`text-sm ${notif.status === 'UNREAD' ? 'font-bold text-indigo-900' : 'font-medium text-gray-700'}`}>
                        {notif.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{notif.body}</p>
                      <span className="text-[10px] text-gray-400 mt-2 block">
                        {new Date(notif.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {notif.status === 'UNREAD' && (
                      <button onClick={() => markAsRead(notif.id)} className="text-indigo-600 hover:text-indigo-800" title="Marquer comme lu">
                        <Check size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsMenu;