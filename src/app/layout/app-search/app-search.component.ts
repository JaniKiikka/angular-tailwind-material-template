import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './app-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('searchContainer', { static: true }) searchContainer!: ElementRef<HTMLDivElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly searchSubject = new Subject<string>();

  // Reactive signals for better performance
  query = signal('');
  suggestions = signal(['Apple', 'Banana', 'Orange', 'Grape', 'Mango']);
  selectedIndex = signal(-1);
  showSuggestions = signal(false);

  // Computed values - automatically update when dependencies change
  filteredSuggestions = computed(() => {
    const queryValue = this.query().toLowerCase().trim();
    if (!queryValue) return [];

    return this.suggestions().filter(item => item.toLowerCase().includes(queryValue));
  });

  suggestionsToDisplay = computed(() => (this.showSuggestions() ? this.filteredSuggestions() : []));

  // Track by function for *ngFor optimization
  trackBySuggestion = (index: number, item: string): string => item;

  constructor() {
    // Debounced search for better performance
    this.searchSubject
      .pipe(debounceTime(150), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.query.set(value);
        this.selectedIndex.set(-1);
        this.showSuggestions.set(this.filteredSuggestions().length > 0 && value.trim() !== '');
      });

    // Effect to handle side effects when suggestions change
    effect(() => {
      const suggestions = this.filteredSuggestions();
      const currentIndex = this.selectedIndex();

      // Reset selection if it's out of bounds
      if (currentIndex >= suggestions.length) {
        this.selectedIndex.set(-1);
      }
    });
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }

  onKeydown(event: KeyboardEvent): void {
    const list = this.filteredSuggestions();
    const max = list.length - 1;
    const currentIndex = this.selectedIndex();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex.set(currentIndex < max ? currentIndex + 1 : 0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex.set(currentIndex > 0 ? currentIndex - 1 : max);
    } else if (event.key === 'Enter') {
      if (currentIndex >= 0 && list[currentIndex]) {
        this.selectSuggestion(list[currentIndex]);
        event.preventDefault();
      }
    }
  }

  selectSuggestion(value: string): void {
    this.query.set(value);
    this.selectedIndex.set(-1);
    this.showSuggestions.set(false);

    // Update the input value immediately for better UX
    if (this.searchInput?.nativeElement) {
      this.searchInput.nativeElement.value = value;
    }
  }

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    // Component cleanup - handled automatically by takeUntilDestroyed
  }

  @HostListener('document:keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent): void {
    // Check for Ctrl+K (or Cmd+K on Mac)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.focusSearchInput();
    }
  }

  @HostListener('document:click', ['$event'])
  handleGlobalClick(event: MouseEvent): void {
    // Check if the click was outside the search container
    if (this.searchContainer?.nativeElement && !this.searchContainer.nativeElement.contains(event.target as Node)) {
      this.showSuggestions.set(false);
    }
  }

  focusSearchInput(): void {
    if (this.searchInput?.nativeElement) {
      this.searchInput.nativeElement.focus();
      this.showSuggestions.set(this.filteredSuggestions().length > 0);
    }
  }
}
