
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/mockSupabase';
import { Appointment, Client } from '../../../types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/formatters';

const DesignerDashboardPage: React.FC = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
    const [recentClients, setRecentClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const appointmentsRes = await supabase.from('appointments').select('*');
            const clientsRes = await supabase.from('clients').select('*');
            
            if (appointmentsRes.data) {
                const upcoming = appointmentsRes.data
                    .filter(a => new Date(a.startTime) > new Date())
                    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                    .slice(0, 3);
                setUpcomingAppointments(upcoming);
            }

            if (clientsRes.data) {
                const recent = clientsRes.data
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 3);
                setRecentClients(recent);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center p-8">Loading dashboard...</div>

    return (
        <div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">Dashboard</h2>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
                {/* Upcoming Appointments Card */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Upcoming Appointments</h3>
                    {upcomingAppointments.length > 0 ? (
                        <ul className="space-y-4">
                            {upcomingAppointments.map(app => (
                                <li key={app.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{app.title}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">With: {app.clientName}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(app.startTime, { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No upcoming appointments.</p>
                    )}
                </div>

                {/* Recent Clients Card */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Clients</h3>
                     {recentClients.length > 0 ? (
                        <ul className="space-y-3">
                            {recentClients.map(client => (
                                <li key={client.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{client.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{client.email}</p>
                                    </div>
                                    <Link to={`/clients/${client.id}`} className="px-3 py-1 text-sm font-medium text-primary-dark bg-primary-light rounded-full hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200 dark:hover:bg-red-900/70">
                                        View
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No recent clients.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DesignerDashboardPage;
