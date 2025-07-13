import React from 'react';

interface HeaderProps {
  onSave: () => void;
  saveError: string;
  saveSuccess: string;
}

const Header: React.FC<HeaderProps> = ({ onSave, saveError, saveSuccess }) => {
  return (
    <header className="relative flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-200">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-blue-700 cursor-pointer">
          Chatbot Flow Builder
        </h1>
      </div>
      
      {/* Centered messages */}
      <div className="absolute flex items-center space-x-3 transform -translate-x-1/2 left-1/2">
        {saveError && (
          <div className="px-4 py-3 font-medium text-black bg-red-200 rounded-md text-medium">
            {saveError}
          </div>
        )}
        {saveSuccess && (
          <div className="px-4 py-3 font-medium text-green-800 bg-green-100 rounded-md text-medium">
            {saveSuccess}
          </div>
        )}
      </div>
      
      <button
        onClick={onSave}
        className="px-8 py-3 font-medium text-blue-700 transition-colors duration-200 border-2 border-blue-700 rounded-md text-medium hover:bg-blue-700 hover:text-white"
      >
        Save Changes
      </button>
    </header>
  );
};

export default Header;