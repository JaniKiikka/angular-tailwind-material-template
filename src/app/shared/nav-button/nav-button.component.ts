import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatRippleModule],
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavButtonComponent {
  @Input() icon = '';
  @Input() label = '';
  @Input() isActive = false;
  @Input() isCollapsed = false;
  @Input() tooltip = '';
  @Input() tooltipPosition: 'left' | 'right' | 'above' | 'below' = 'right';
  @Input() tooltipDisabled = false;
  @Input() testId = '';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
