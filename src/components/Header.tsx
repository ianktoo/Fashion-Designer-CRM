
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../lib/auth';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if(auth) {
        auth.logout();
        navigate('/login');
    }
  };

  return (
    <header className="flex items-center justify-end h-20 px-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
