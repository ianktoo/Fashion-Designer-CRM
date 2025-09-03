
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../../components/ThemeToggle';

const ClientPortalPage: React.FC = () => {
    const [shortId, setShortId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (shortId.trim()) {
            navigate(`/booking/${shortId.trim().toUpperCase()}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
             <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
                 <h1 className="text-4xl font-bold text-primary-dark tracking-wider">Atelier</h1>
                 <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Client Portal</h2>
                 <p className="text-gray-600 dark:text-gray-400">Enter your Client ID to manage your appointments.</p>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        value={shortId}
                        onChange={(e) => setShortId(e.target.value)}
                        placeholder="e.g., EVANCE"
                        className="w-full px-4 py-2 text-center text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary"
                        aria-label="Client Short ID"
                    />
                    <button 
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                        Find My Appointments
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClientPortalPage;