import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsInputComponent, type NumberFormatConfig } from '../../input/ds-input';
import { BaseEditableCellComponent, type EditableCellComponentData } from './base-editable-cell.component';

export interface EditableTextCellData extends EditableCellComponentData {
  /** Placeholder text */
  placeholder?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is readonly */
  readonly?: boolean;
  /** Icon to show at the start of the input */
  leadingIcon?: string;
  /** Icon to show at the end of the input */
  trailingIcon?: string;
  /** Text prefix to show at the start of the input */
  prefix?: string;
  /** Text suffix to show at the end of the input */
  suffix?: string;
  /** Text alignment (automatically set from column meta.align) */
  align?: 'left' | 'right' | 'center';
}

/**
 * Editable table cell component for text input
 * Uses ds-input in ghost mode for seamless inline editing
 */
@Component({
  selector: 'editable-text-cell',
  standalone: true,
  imports: [CommonModule, FormsModule, DsInputComponent],
  template: `
    <ds-input
      [ngModel]="cellData().value ?? ''"
      [placeholder]="cellData().placeholder || ''"
      [disabled]="cellData().disabled || false"
      [readonly]="cellData().readonly || false"
      [ghost]="true"
      [leadingIcon]="cellData().leadingIcon"
      [trailingIcon]="cellData().trailingIcon"
      [prefix]="cellData().prefix"
      [suffix]="cellData().suffix"
      [format]="getFormatForAlignment()"
      (ngModelChange)="onValueChange($event)"
      (blurred)="onBlur()"
      (keydown.enter)="onEnter()"
    />
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class EditableTextCellComponent extends BaseEditableCellComponent {
  /** Computed cell data with proper typing */
  cellData = computed(() => this.data() as EditableTextCellData);
  
  /** Track the original value when editing starts to detect actual changes */
  private originalValue: string | null = null;
  private isEditing = false;
  
  /**
   * Get format config for alignment
   */
  getFormatForAlignment(): NumberFormatConfig | undefined {
    return this.cellData().align ? { align: this.cellData().align } as NumberFormatConfig : undefined;
  }
  
  /**
   * Handle value changes - track that editing has started
   */
  onValueChange(val: string) {
    // Track that we've started editing and capture the original value
    if (!this.isEditing) {
      this.originalValue = this.cellData().value;
      this.isEditing = true;
    }
    
    this.valueChanged.emit(val);
  }
  
  /**
   * Handle blur event - emit committed value only if it actually changed
   */
  onBlur() {
    // Only emit if value actually changed during this edit session
    if (this.isEditing && this.originalValue !== this.cellData().value) {
      this.valueCommitted.emit(this.cellData().value);
    }
    
    // Reset tracking
    this.isEditing = false;
    this.originalValue = null;
  }
  
  /**
   * Handle Enter key - emit committed value only if it actually changed
   */
  onEnter() {
    // Only emit if value actually changed during this edit session
    if (this.isEditing && this.originalValue !== this.cellData().value) {
      this.valueCommitted.emit(this.cellData().value);
    }
    
    // Reset tracking
    this.isEditing = false;
    this.originalValue = null;
  }
}

