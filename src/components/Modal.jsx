import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic intérieur
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;