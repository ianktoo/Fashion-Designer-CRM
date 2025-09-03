
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  short_id: string;
  preferences: { [key: string]: any };
  measurements: { [key: string]: any };
  createdAt: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName?: string;
  startTime: string;
  endTime: string;
  title: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Idea {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName?: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate?: string;
  items: InvoiceItem[];
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid';
  paymentMethod: 'Cash';
}

export interface ClientMedia {
  id: string;
  clientId: string;
  storagePath: string;
  caption?: string;
  createdAt: string;
}
