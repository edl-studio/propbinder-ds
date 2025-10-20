import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../../icon/ds-icon';
import { BaseCellComponent, type CellComponentData } from './base-cell.component';

export interface DateCellData extends CellComponentData {
  /** Date text to display */
  date: string;
  /** Show calendar icon */
  showIcon?: boolean;
  /** Text CSS class */
  textClass?: string;
}

/**
 * Table cell component that displays a date with optional calendar icon
 * Useful for date columns with consistent formatting
 */
@Component({
  selector: 'date-cell',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  template: `
    <div class="tw-flex tw-items-center tw-gap-1.5" [class]="cellData().textClass || 'body-sm-regular'">
      @if (cellData().showIcon) {
        <ds-icon 
          name="remixCalendarLine"
          size="14px"
          color="var(--text-color-default-secondary)"
        />
      }
      <span>{{ cellData().date }}</span>
    </div>
  `,
})
export class DateCellComponent extends BaseCellComponent {
  /** Computed cell data with proper typing */
  cellData = computed(() => this.data() as DateCellData);
}

