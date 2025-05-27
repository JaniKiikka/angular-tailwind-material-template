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
      phone: '+1 (555) 123-4567',
      company: 'Tech Solutions Inc.',
      status: 'active',
      lastOrder: new Date('2025-05-15'),
      totalOrders: 12,
    },
    {
      id: '2',
      name: 'Emma Wilson',
      email: 'emma.w@digicorp.net',
      phone: '+1 (555) 987-6543',
      company: 'Digital Corporation',
      status: 'active',
      lastOrder: new Date('2025-05-20'),
      totalOrders: 8,
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'mchen@innovate.io',
      phone: '+1 (555) 456-7890',
      company: 'Innovate Solutions',
      status: 'inactive',
      lastOrder: new Date('2025-03-10'),
      totalOrders: 3,
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      email: 'sjohnson@cloudtech.com',
      phone: '+1 (555) 234-5678',
      company: 'Cloud Technologies',
      status: 'active',
      lastOrder: new Date('2025-05-25'),
      totalOrders: 15,
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'dbrown@megacorp.com',
      phone: '+1 (555) 876-5432',
      company: 'Mega Corporation',
      status: 'active',
      lastOrder: new Date('2025-05-22'),
      totalOrders: 6,
    },
  ];

  getCustomers(): Observable<Customer[]> {
    return of(this.mockCustomers);
  }
}
