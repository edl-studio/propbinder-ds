import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../../icon/ds-icon';
import { BaseCellComponent, type CellComponentData } from './base-cell.component';

export interface IconTextCellData extends CellComponentData {
  /** Icon name (design system icon name) */
  iconName?: string;
  /** Icon size */
  iconSize?: string;
  /** Icon color */
  iconColor?: string;
  /** Text to display */
  text: string;
  /** Text CSS class */
  textClass?: string;
  /** Gap between icon and text */
  gap?: string;
}

/**
 * Table cell component that displays an icon next to text
 * Commonly used for displaying items with associated icons
 */
@Component({
  selector: 'icon-text-cell',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  template: `
    <div class="tw-flex tw-items-center" [style.gap]="cellData().gap || '8px'">
      @if (cellData().iconName) {
        <ds-icon 
          [name]="cellData().iconName!"
          [size]="cellData().iconSize || '16px'"
          [color]="cellData().iconColor || 'var(--text-color-default-secondary)'"
        />
      }
      <span [class]="cellData().textClass || 'body-sm-medium'">
        {{ cellData().text }}
      </span>
    </div>
  `,
})
export class IconTextCellComponent extends BaseCellComponent {
  /** Computed cell data with proper typing */
  cellData = computed(() => this.data() as IconTextCellData);
}

