
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UsersIcon, CalendarIcon, LightBulbIcon } from './Icons';

const Sidebar: React.FC = () => {
  const commonLinkClasses = "flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-primary-light dark:hover:bg-gray-700 hover:text-primary-dark dark:hover:text-gray-100 transition-colors duration-200";
  const activeLinkClasses = "bg-primary-light dark:bg-gray-700 text-primary-dark dark:text-gray-100 border-r-4 border-primary-dark dark:border-primary-light";

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-primary-dark dark:text-gray-100 tracking-wider">Atelier</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="mx-4 font-medium">Dashboard</span>
        </NavLink>
        <NavLink 
            to="/clients" 
            className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <UsersIcon className="w-6 h-6" />
          <span className="mx-4 font-medium">Clients</span>
        </NavLink>
        <NavLink 
            to="/appointments" 
            className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <CalendarIcon className="w-6 h-6" />
          <span className="mx-4 font-medium">Appointments</span>
        </NavLink>
        <NavLink 
            to="/ideas" 
            className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <LightBulbIcon className="w-6 h-6" />
          <span className="mx-4 font-medium">Ideas</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
