import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppSearchComponent } from './layout/app-search/app-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, AppSearchComponent, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-tailwind-material-template';

  currentUser: { name: string; avatarUrl: string } = {
    name: 'Jane Doe',
    avatarUrl: 'favicon.ico',
  };

  constructor(private dialogService: DialogService) {}

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
