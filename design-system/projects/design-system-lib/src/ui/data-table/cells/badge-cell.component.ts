import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsBadgeComponent, type BadgeVariant } from '../../badge/ds-badge';
import { BaseCellComponent, type CellComponentData } from './base-cell.component';

export interface BadgeCellData extends CellComponentData {
  /** Badge content/text */
  content: string;
  /** Badge variant */
  variant?: BadgeVariant;
}

/**
 * Table cell component that displays a badge
 * Useful for status, category, or label columns
 */
@Component({
  selector: 'badge-cell',
  standalone: true,
  imports: [CommonModule, DsBadgeComponent],
  template: `
    <ds-badge
      [content]="cellData().content"
      [variant]="cellData().variant || 'default'"
    />
  `,
})
export class BadgeCellComponent extends BaseCellComponent {
  /** Computed cell data with proper typing */
  cellData = computed(() => this.data() as BadgeCellData);
}

