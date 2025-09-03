
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../services/mockSupabase';
import { Client } from '../../../types';

const ClientListPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('clients').select('*');
      if (data) {
        setClients(data);
      }
      setLoading(false);
    };
    fetchClients();
  }, []);
  
  if (loading) return <div className="text-center p-8">Loading clients...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Clients</h2>
        <button className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Add New Client
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Short ID</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-5 py-4 text-sm bg-transparent">
                    <p className="text-gray-900 dark:text-gray-200 whitespace-no-wrap">{client.name}</p>
                </td>
                <td className="px-5 py-4 text-sm bg-transparent">
                  <p className="text-gray-900 dark:text-gray-200 whitespace-no-wrap">{client.email}</p>
                </td>
                <td className="px-5 py-4 text-sm bg-transparent">
                  <p className="text-gray-900 dark:text-gray-200 whitespace-no-wrap">{client.phone}</p>
                </td>
                <td className="px-5 py-4 text-sm bg-transparent">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 dark:text-green-200 leading-tight">
                    <span aria-hidden className="absolute inset-0 bg-green-200 dark:bg-green-900 opacity-50 rounded-full"></span>
                    <span className="relative">{client.short_id}</span>
                  </span>
                </td>
                <td className="px-5 py-4 text-sm bg-transparent text-right">
                  <Link to={`/clients/${client.id}`} className="text-primary-dark hover:text-red-700 dark:text-primary-light dark:hover:text-red-300 font-semibold">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientListPage;
