import { Component, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { MetricCardComponent, MetricData } from '../../../shared/metric-card/metric-card.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MetricCardComponent,
  ],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent implements OnInit {
  allCustomers = signal<Customer[]>([]);
  selectedFilter = signal<'all' | 'active' | 'inactive'>('all');
  sortState = signal<Sort>({ active: '', direction: '' });
  pageIndex = signal<number>(0);
  pageSize = signal<number>(10);

  // Computed for filtered and sorted customers (before pagination)
  filteredAndSortedCustomers = computed(() => {
    const filter = this.selectedFilter();
    const allCustomers = this.allCustomers();
    const sort = this.sortState();

    let filteredCustomers = allCustomers;

    // Apply filter
    if (filter !== 'all') {
      filteredCustomers = allCustomers.filter(customer => customer.status === filter);
    }

    // Apply sorting
    if (!sort.active || sort.direction === '') {
      return filteredCustomers;
    }

    return filteredCustomers.slice().sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'company':
          return compare(a.company, b.company, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'lastOrder':
          return compare(a.lastOrder, b.lastOrder, isAsc);
        case 'totalOrders':
          return compare(a.totalOrders, b.totalOrders, isAsc);
        default:
          return 0;
      }
    });
  });

  // Total count of filtered customers (for paginator)
  totalCustomers = computed(() => this.filteredAndSortedCustomers().length);

  // Paginated customers for display
  customers = computed(() => {
    const filteredAndSorted = this.filteredAndSortedCustomers();
    const pageIndex = this.pageIndex();
    const pageSize = this.pageSize();

    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    return filteredAndSorted.slice(startIndex, endIndex);
  });

  displayedColumns: string[] = ['name', 'company', 'email', 'phone', 'status', 'lastOrder', 'totalOrders', 'actions'];

  metricsData: MetricData[] = [
    {
      name: 'Total Revenue',
      value: '$124,500',
      change: 12.5,
      changeType: 'increase',
      icon: 'attach_money',
    },
    {
      name: 'Active Customers',
      value: '1,248',
      change: 8.2,
      changeType: 'increase',
      icon: 'people',
    },
    {
      name: 'Orders This Month',
      value: '342',
      change: -3.1,
      changeType: 'decrease',
      icon: 'shopping_cart',
    },
    {
      name: 'Conversion Rate',
      value: '24.8%',
      change: 5.7,
      changeType: 'increase',
      icon: 'trending_up',
    },
  ];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe(data => {
      this.allCustomers.set(data);
    });
  }

  onFilterChange(filter: 'all' | 'active' | 'inactive') {
    this.selectedFilter.set(filter);
    // Reset to first page when filter changes
    this.pageIndex.set(0);
  }

  onSort(sort: Sort) {
    this.sortState.set(sort);
    // Reset to first page when sort changes
    this.pageIndex.set(0);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}

function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean) {
  if (a instanceof Date && b instanceof Date) {
    return (a.getTime() - b.getTime()) * (isAsc ? 1 : -1);
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
