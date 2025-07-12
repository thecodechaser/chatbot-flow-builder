import React from 'react';

interface HeaderProps {
  onSave: () => void;
  saveError: string;
  saveSuccess: string;
}

const Header: React.FC<HeaderProps> = ({ onSave, saveError, saveSuccess }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center relative">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Chatbot Flow Builder
        </h1>
      </div>
      
      {/* Centered messages */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
        {saveError && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md text-sm font-medium">
            {saveError}
          </div>
        )}
        {saveSuccess && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm font-medium">
            {saveSuccess}
          </div>
        )}
      </div>
      
      <button
        onClick={onSave}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
      >
        Save Changes
      </button>
    </header>
  );
};

export default Header;