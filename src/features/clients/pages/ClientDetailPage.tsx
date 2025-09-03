
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../../services/mockSupabase';
import { Client, Appointment, Invoice, ClientMedia } from '../../../types';

type Tab = 'details' | 'appointments' | 'invoices' | 'gallery';

const ClientDetailPage: React.FC = () => {
    const { clientId } = useParams<{ clientId: string }>();
    const [client, setClient] = useState<Client | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [media, setMedia] = useState<ClientMedia[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('details');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const createdObjectUrls = useRef<string[]>([]); // To track and clean up blob URLs

    useEffect(() => {
        if (!clientId) return;
        const fetchData = async () => {
            setLoading(true);
            const clientRes = await supabase.from('clients').eq('id', clientId);
            const appRes = await supabase.from('appointments').eq('clientId', clientId);
            const invRes = await supabase.from('invoices').eq('clientId', clientId);
            const mediaRes = await supabase.from('client_media').eq('clientId', clientId);

            if (clientRes.data) setClient(clientRes.data[0]);
            if (appRes.data) setAppointments(appRes.data);
            if (invRes.data) setInvoices(invRes.data);
            if (mediaRes.data) setMedia(mediaRes.data);
            
            setLoading(false);
        };
        fetchData();
    }, [clientId]);

    // Effect to clean up object URLs on component unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            createdObjectUrls.current.forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

    const handleTakePhoto = () => {
        fileInputRef.current?.click();
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const objectUrl = URL.createObjectURL(file);
            createdObjectUrls.current.push(objectUrl); // Track the URL for cleanup

            const newPhoto: ClientMedia = {
                id: self.crypto.randomUUID(), // More robust unique ID
                clientId: clientId!,
                storagePath: objectUrl,
                caption: `New Photo - ${new Date().toLocaleDateString()}`,
                createdAt: new Date().toISOString(),
            };
            setMedia(prevMedia => [...prevMedia, newPhoto]);
        }
    };


    if (loading) return <div className="text-center p-8">Loading client details...</div>;
    if (!client) return <div className="text-center p-8 text-red-500">Client not found.</div>;

    const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tabName ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            {label}
        </button>
    );
    
    const renderPreferences = () => {
      return Object.entries(client.preferences).map(([key, value]) => (
        <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">{Array.isArray(value) ? value.join(', ') : value}</span>
        </div>
      ));
    };

    const renderMeasurements = () => {
      return Object.entries(client.measurements).map(([key, value]) => (
        <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400 capitalize">{key}</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">{value}"</span>
        </div>
      ));
    };

    return (
        <div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">{client.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{client.email} &middot; {client.phone}</p>
            
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                    <TabButton tabName="details" label="Details" />
                    <TabButton tabName="appointments" label="Appointments" />
                    <TabButton tabName="invoices" label="Invoices" />
                    <TabButton tabName="gallery" label="Gallery" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                {activeTab === 'details' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">Preferences</h3>
                            <div className="space-y-2">{renderPreferences()}</div>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">Measurements</h3>
                            <div className="space-y-2">{renderMeasurements()}</div>
                        </div>
                    </div>
                )}
                {activeTab === 'appointments' && (
                    <div>
                        <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-4">Appointments</h3>
                        <ul className="space-y-3">
                            {appointments.map(a => (
                                <li key={a.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{a.title} <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${a.status === 'completed' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>{a.status}</span></p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(a.startTime).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 {activeTab === 'invoices' && (
                    <div>
                        <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-4">Invoices</h3>
                         <ul className="space-y-3">
                            {invoices.map(i => (
                                <li key={i.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">Invoice {i.invoiceNumber}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Issued: {new Date(i.issueDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-lg text-gray-800 dark:text-gray-200">${i.totalAmount.toFixed(2)}</p>
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${i.status === 'paid' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>{i.status}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 {activeTab === 'gallery' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300">Client Gallery</h3>
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <button onClick={handleTakePhoto} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark">
                                Take Photo
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {media.map(m => (
                                <div key={m.id} className="group relative">
                                    <img src={m.storagePath} alt={m.caption || 'Client media'} className="w-full h-48 object-cover rounded-lg shadow-sm" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg">
                                        {m.caption}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientDetailPage;