import React, { useState } from 'react';
import { X } from 'lucide-react';
import { mockAdminUser, mockStudentUser } from '../data/mockData';

const LoginModal = ({ onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
  });

  const handleSubmit = () => {
    // Logique de soumission
    if (!formData.email || !formData.password) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (!isLogin && (!formData.nom || !formData.prenom)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simuler la connexion
    let userToLogin;
    if (formData.email.includes('admin')) {
      userToLogin = { ...mockAdminUser, ...formData };
    } else {
      userToLogin = { ...mockStudentUser, ...formData, prenom: formData.prenom || 'Emma', nom: formData.nom || 'Johnson' };
    }
    
    setUser(userToLogin);
    onClose();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      {/* Onglets */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setIsLogin(true)}
          className={`py-2 px-4 text-sm font-medium ${isLogin ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
        >
          Login
        </button>
        <button 
          onClick={() => setIsLogin(false)}
          className={`py-2 px-4 text-sm font-medium ${!isLogin ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
        >
          Create Account
        </button>
      </div>

      {/* Formulaire */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
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
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {isLogin && (
          <div className="text-right">
            <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
          </div>
        )}

        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          {isLogin ? 'Sign In' : "S'inscrire"}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <button type="button" className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" className="w-5 h-5" />
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;