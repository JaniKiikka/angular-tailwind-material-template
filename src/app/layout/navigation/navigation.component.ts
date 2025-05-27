import { Component, signal, computed, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, map } from 'rxjs/operators';
import { NavButtonComponent } from '../../shared';

export interface NavigationItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    NavButtonComponent,
  ],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  // Navigation state
  isCollapsed = signal(false);
  currentRoute = signal('');
  private isSmallScreen = signal(false);

  // Check if we should auto-collapse based on screen size (smaller laptops)
  shouldAutoCollapse = computed(() => this.isSmallScreen());

  // The navigation is collapsed if manually collapsed OR if it should auto-collapse
  isNavigationCollapsed = computed(() => this.isCollapsed() || this.shouldAutoCollapse());

  // Navigation items
  navigationItems: NavigationItem[] = [
    { label: 'Customers', icon: 'people', route: '/customers' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];

  ngOnInit() {
    // Track current route for highlighting active nav item
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(event => event.urlAfterRedirects)
      )
      .subscribe(url => {
        this.currentRoute.set(url);
      });

    // Monitor breakpoint changes for auto-collapse (smaller laptops)
    this.breakpointObserver.observe(['(max-width: 1279px)']).subscribe(result => {
      this.isSmallScreen.set(result.matches);
      // Reset manual collapse state when screen size changes to large
      if (!result.matches) {
        this.isCollapsed.set(false);
      }
    });
  }

  toggleNavigation() {
    this.isCollapsed.update(value => !value);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    // Auto-collapse on small screens after navigation
    if (this.shouldAutoCollapse()) {
      this.isCollapsed.set(true);
    }
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute() === route || this.currentRoute().startsWith(route + '/');
  }
}
