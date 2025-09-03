
import { Client, Appointment, Idea, Invoice, ClientMedia } from '../types';

// --- MOCK DATA ---

const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Eleanor Vance', email: 'eleanor@example.com', phone: '555-0101', short_id: 'EVANCE', preferences: { style: 'Classic', colors: ['Navy', 'White'], fabrics: ['Silk', 'Cashmere'] }, measurements: { bust: 34, waist: 26, hips: 36, inseam: 32 }, createdAt: '2023-10-01T10:00:00Z' },
  { id: '2', name: 'Marcus Holloway', email: 'marcus@example.com', phone: '555-0102', short_id: 'MHLLO', preferences: { style: 'Streetwear', brands: ['Supreme', 'Nike'], dislikes: ['Formal wear'] }, measurements: { chest: 40, waist: 32, sleeve: 25 }, createdAt: '2023-09-15T14:30:00Z' },
  { id: '3', name: 'Chloe Price', email: 'chloe@example.com', phone: '555-0103', short_id: 'CPRICE', preferences: { style: 'Punk Rock', colors: ['Black', 'Blue'], fit: 'Slim' }, measurements: { bust: 32, waist: 25, hips: 34 }, createdAt: '2023-11-05T11:00:00Z' },
];

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', clientId: '1', clientName: 'Eleanor Vance', startTime: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(), endTime: new Date(Date.now() + 2 * 24 * 3600 * 1000 + 3600 * 1000).toISOString(), title: 'Initial Consultation', status: 'scheduled' },
  { id: 'a2', clientId: '2', clientName: 'Marcus Holloway', startTime: new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString(), endTime: new Date(Date.now() + 4 * 24 * 3600 * 1000 + 3600 * 1000).toISOString(), title: 'Fitting Session', status: 'scheduled' },
  { id: 'a3', clientId: '1', clientName: 'Eleanor Vance', startTime: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(), endTime: new Date(Date.now() - 7 * 24 * 3600 * 1000 + 3600 * 1000).toISOString(), title: 'Design Review', status: 'completed' },
  { id: 'a4', clientId: '3', clientName: 'Chloe Price', startTime: new Date(Date.now() + 1 * 24 * 3600 * 1000).toISOString(), endTime: new Date(Date.now() + 1 * 24 * 3600 * 1000 + 3600 * 1000).toISOString(), title: 'Fabric Selection', status: 'scheduled' },
];

const MOCK_IDEAS: Idea[] = [
    { id: 'i1', title: 'Autumn Collection 2024', content: 'Focus on earthy tones, heavy wools, and layered silhouettes. Inspired by misty mornings in the Scottish highlands.', tags: ['collection', 'autumn', 'wool'], createdAt: new Date().toISOString(), imageUrl: `https://picsum.photos/seed/idea1/400/300` },
    { id: 'i2', title: 'Bridal Gown Concept', content: 'A-line dress with intricate lace details on the bodice and a long, flowing train. Minimalist but elegant.', tags: ['bridal', 'lace', 'elegant'], createdAt: new Date().toISOString(), imageUrl: `https://picsum.photos/seed/idea2/400/300` },
    { id: 'i3', title: 'Streetwear Jacket', content: 'Bomber jacket with custom patches and a silk lining. Oversized fit.', tags: ['streetwear', 'jacket'], createdAt: new Date().toISOString(), imageUrl: `https://picsum.photos/seed/idea3/400/300` },
];

const MOCK_INVOICES: Invoice[] = [
    { id: 'inv1', clientId: '1', clientName: 'Eleanor Vance', invoiceNumber: '2024-001', issueDate: '2023-10-15T00:00:00Z', items: [{description: 'Custom Silk Blouse', quantity: 1, price: 450}], totalAmount: 450, status: 'paid', paymentMethod: 'Cash'},
    { id: 'inv2', clientId: '1', clientName: 'Eleanor Vance', invoiceNumber: '2024-003', issueDate: '2023-11-20T00:00:00Z', items: [{description: 'Alterations on Evening Gown', quantity: 1, price: 150}], totalAmount: 150, status: 'sent', paymentMethod: 'Cash'},
    { id: 'inv3', clientId: '2', clientName: 'Marcus Holloway', invoiceNumber: '2024-002', issueDate: '2023-09-30T00:00:00Z', items: [{description: 'Custom Denim Jacket', quantity: 1, price: 600}, {description: 'Graphic Tee', quantity: 2, price: 75}], totalAmount: 750, status: 'paid', paymentMethod: 'Cash'},
];

const MOCK_CLIENT_MEDIA: ClientMedia[] = [
    { id: 'm1', clientId: '1', storagePath: 'https://picsum.photos/seed/media1/500/700', caption: 'Initial fitting photo', createdAt: new Date().toISOString() },
    { id: 'm2', clientId: '1', storagePath: 'https://picsum.photos/seed/media2/500/700', caption: 'Fabric choice', createdAt: new Date().toISOString() },
    { id: 'm3', clientId: '2', storagePath: 'https://picsum.photos/seed/media3/500/700', caption: 'Jacket design sketch', createdAt: new Date().toISOString() },
];


// --- MOCK API ---

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const supabase = {
  from: (tableName: string) => {
    const tables: { [key: string]: any[] } = {
      clients: MOCK_CLIENTS,
      appointments: MOCK_APPOINTMENTS,
      ideas: MOCK_IDEAS,
      invoices: MOCK_INVOICES,
      client_media: MOCK_CLIENT_MEDIA,
    };

    return {
      select: async (columns = '*') => {
        await delay(300);
        console.log(`SELECT ${columns} FROM ${tableName}`);
        return { data: tables[tableName] || [], error: null };
      },
      eq: async (column: string, value: any) => {
        await delay(300);
        console.log(`SELECT * FROM ${tableName} WHERE ${column} = ${value}`);
        const data = tables[tableName]?.filter(item => item[column] === value) || [];
        return { data, error: null };
      },
       single: async () => {
        await delay(300);
        console.log(`SELECT SINGLE FROM ${tableName}`);
        return { data: tables[tableName]?.[0] || null, error: null };
      },
      insert: async (newData: any) => {
        await delay(300);
        const newItem = { id: Math.random().toString(36).substring(2, 9), ...newData, createdAt: new Date().toISOString() };
        tables[tableName].push(newItem);
        console.log(`INSERT INTO ${tableName}`, newItem);
        return { data: [newItem], error: null };
      }
    };
  },
};
