import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      salesContact: 'Alice Johnson',
      company: 'Tech Solutions Inc.',
      status: 'active',
      lastOrder: new Date('2025-05-15'),
      totalOrders: 12,
      assignedTo: 'me',
    },
    {
      id: '2',
      name: 'Emma Wilson',
      email: 'emma.w@digicorp.net',
      salesContact: 'Bob Martinez',
      company: 'Digital Corporation',
      status: 'active',
      lastOrder: new Date('2025-05-20'),
      totalOrders: 8,
      assignedTo: 'me',
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'mchen@innovate.io',
      salesContact: 'Carol Davis',
      company: 'Innovate Solutions',
      status: 'inactive',
      lastOrder: new Date('2025-03-10'),
      totalOrders: 3,
      assignedTo: 'John Doe',
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      email: 'sjohnson@cloudtech.com',
      salesContact: 'David Wilson',
      company: 'Cloud Technologies',
      status: 'active',
      lastOrder: new Date('2025-05-25'),
      totalOrders: 15,
      assignedTo: 'Jane Smith',
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'dbrown@megacorp.com',
      salesContact: 'Eva Rodriguez',
      company: 'Mega Corporation',
      status: 'active',
      lastOrder: new Date('2025-05-22'),
      totalOrders: 6,
      assignedTo: 'unassigned',
    },
  ];

  getCustomers(): Observable<Customer[]> {
    return of(this.mockCustomers);
  }
}
