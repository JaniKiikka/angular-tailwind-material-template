import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface MetricData {
  name: string;
  value: string;
  change: number;
  icon: string;
  changeType: 'increase' | 'decrease';
}

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './metric-card.component.html',
  styleUrl: './metric-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricCardComponent {
  @Input() metric!: MetricData;
}
