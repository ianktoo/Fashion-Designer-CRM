
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/mockSupabase';
import { Appointment } from '../../../types';
import { formatDate } from '../../../utils/formatters';

const AppointmentsPage: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            const { data } = await supabase.from('appointments').select('*');
            if (data) {
                const sortedData = data.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
                setAppointments(sortedData);
            }
            setLoading(false);
        };
        fetchAppointments();
    }, []);

    if (loading) return <div className="text-center p-8">Loading appointments...</div>;

    return (
        <div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">Appointments</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {appointments.map(app => (
                        <li key={app.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold text-primary-dark dark:text-primary-light">{app.title}</p>
                                <p className="text-md text-gray-800 dark:text-gray-300">With <span className="font-medium">{app.clientName}</span></p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(app.startTime, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                            </div>
                            <div>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                    app.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                    app.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                    {app.status}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AppointmentsPage;
