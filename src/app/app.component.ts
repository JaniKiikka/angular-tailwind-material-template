import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppSearchComponent } from './layout/app-search/app-search.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from './shared';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    AppSearchComponent,
    NavigationComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-tailwind-material-template';

  currentUser: { name: string; avatarUrl: string } = {
    name: 'Jane Doe',
    avatarUrl: 'favicon.ico',
  };

  // Reactive signals for custom sidenav
  isLargeScreen = signal(true);
  private _sidenavOpened = signal(true);
  sidenavOpened = computed(() => (this.isLargeScreen() ? this._sidenavOpened() : this._sidenavOpened()));

  constructor(
    private dialogService: DialogService,
    private breakpointObserver: BreakpointObserver
  ) {
    // Monitor screen size for responsive behavior
    this.breakpointObserver
      .observe([
        '(min-width: 1024px)', // Large screen threshold for desktop behavior
      ])
      .subscribe(result => {
        this.isLargeScreen.set(result.matches);
        // On large screens, keep sidenav open by default
        if (result.matches) {
          this._sidenavOpened.set(true);
        }
      });
  }

  toggleSidenav() {
    this._sidenavOpened.set(!this._sidenavOpened());
  }

  closeSidenav() {
    this._sidenavOpened.set(false);
  }

  openDialog() {
    this.dialogService
      .open({
        title: 'Confirm Action',
        content: 'Are you sure you want to perform this action?',
        buttons: [
          { text: 'Cancel', value: false },
          { text: 'OK', color: 'primary', value: true },
        ],
      })
      .subscribe(result => console.log('Dialog result:', result));
  }
}
