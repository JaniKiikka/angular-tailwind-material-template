export interface Customer {
  id: string;
  name: string;
  email: string;
  salesContact: string;
  company: string;
  status: 'active' | 'inactive';
  lastOrder: Date;
  totalOrders: number;
  assignedTo: 'me' | 'unassigned' | string; // 'me' for my customers, 'unassigned' for unassigned, or specific person name
}
