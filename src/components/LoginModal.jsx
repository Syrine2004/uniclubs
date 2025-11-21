import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';

const LoginModal = ({ onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation simple
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires');
      setIsLoading(false);
      return;
    }
    if (!isLogin && (!formData.nom || !formData.prenom)) {
      setError('Veuillez remplir votre nom et prénom');
      setIsLoading(false);
      return;
    }

    try {
      // Choix de l'URL : on parle au vrai serveur (port 4000)
      const endpoint = isLogin 
        ? 'http://localhost:4000/api/auth/login' 
        : 'http://localhost:4000/api/auth/register';

      // Préparation des données
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            email: formData.email, 
            password: formData.password,
            firstName: formData.prenom, 
            lastName: formData.nom      
          };

      // Envoi de la requête au backend
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      // SUCCÈS !
      // On sauvegarde le token de sécurité
      localStorage.setItem('token', data.token);
      
      // On connecte l'utilisateur dans l'app
      setUser(data.user);
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{isLogin ? 'Connexion' : 'Créer un compte'}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      {/* Onglets */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => { setIsLogin(true); setError(''); }}
          className={`py-2 px-4 text-sm font-medium ${isLogin ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
        >
          Se connecter
        </button>
        <button 
          onClick={() => { setIsLogin(false); setError(''); }}
          className={`py-2 px-4 text-sm font-medium ${!isLogin ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
        >
          S'inscrire
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={(e) => setFormData({...formData, prenom: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}
        
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Entrez votre email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex justify-center items-center gap-2"
        >
          {isLoading && <Loader className="animate-spin w-5 h-5" />}
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default LoginModal;