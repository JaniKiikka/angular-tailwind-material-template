import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.css'],
})
export class AppSearchComponent {
  query = '';
  suggestions = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];
  filteredSuggestions: string[] = [];
  selectedIndex = -1;

  onInput(): void {
    this.filteredSuggestions = this.suggestions.filter(item => item.toLowerCase().includes(this.query.toLowerCase()));
    this.selectedIndex = -1;
  }

  onKeydown(event: KeyboardEvent): void {
    const list = this.filteredSuggestions;
    const max = list.length - 1;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = this.selectedIndex < max ? this.selectedIndex + 1 : 0;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = this.selectedIndex > 0 ? this.selectedIndex - 1 : max;
    } else if (event.key === 'Enter') {
      if (this.selectedIndex >= 0) {
        this.selectSuggestion(list[this.selectedIndex]);
        event.preventDefault();
      }
    }
  }

  selectSuggestion(value: string): void {
    this.query = value;
    this.filteredSuggestions = [];
    this.selectedIndex = -1;
  }

  get suggestionsToDisplay(): string[] {
    return this.filteredSuggestions;
  }
}
