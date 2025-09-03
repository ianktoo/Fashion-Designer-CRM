
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../../services/mockSupabase';
import { Appointment, Client } from '../../../types';
import ThemeToggle from '../../../components/ThemeToggle';
import { formatDate } from '../../../utils/formatters';

const ClientBookingPage: React.FC = () => {
    const { shortId } = useParams<{ shortId: string }>();
    const [client, setClient] = useState<Client | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!shortId) return;
        
        const fetchData = async () => {
            setLoading(true);
            setError('');
            const clientRes = await supabase.from('clients').eq('short_id', shortId);
            
            if (clientRes.data && clientRes.data.length > 0) {
                const foundClient = clientRes.data[0];
                setClient(foundClient);
                const appRes = await supabase.from('appointments').eq('clientId', foundClient.id);
                if (appRes.data) {
                    setAppointments(appRes.data);
                }
            } else {
                setError('Client ID not found. Please check and try again.');
            }
            setLoading(false);
        };
        
        fetchData();
    }, [shortId]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
             <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="w-full max-w-2xl p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                {loading && <p className="text-center">Loading your information...</p>}
                {error && <p className="text-center text-red-600 font-semibold">{error}</p>}
                
                {client && !loading && (
                    <>
                        <div className="text-center border-b dark:border-gray-700 pb-4">
                            <h1 className="text-4xl font-bold text-primary-dark dark:text-primary-light">Welcome, {client.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Here are your appointment details.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Your Appointments</h2>
                            {appointments.length > 0 ? (
                                <ul className="space-y-4">
                                    {appointments.map(app => (
                                        <li key={app.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <p className="font-bold text-gray-900 dark:text-gray-200">{app.title}</p>
                                            <p className="text-gray-700 dark:text-gray-400">{formatDate(app.startTime, { dateStyle: 'full', timeStyle: 'short' })}</p>
                                            <p className="mt-1"><span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${app.status === 'completed' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>{app.status}</span></p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400 py-4">You have no appointments scheduled.</p>
                            )}
                        </div>

                        <div className="pt-4 border-t dark:border-gray-700">
                            <button className="w-full px-4 py-3 font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                                Request a New Appointment
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ClientBookingPage;
