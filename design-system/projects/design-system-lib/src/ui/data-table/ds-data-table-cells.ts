/**
 * Helper components and cell renderers for ds-data-table
 * Provides common cell types like editable cells, action cells, badges, etc.
 */

import { Component, input, output, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsInputComponent } from '../input/ds-input';
import { DsButtonComponent } from '../button/ds-button';
import { DsBadgeComponent } from '../badge/ds-badge';
import type { CellContext } from '@tanstack/angular-table';

/**
 * Editable text cell component
 * Double-click to edit, Enter to save, Escape to cancel
 */
@Component({
  selector: 'ds-data-table-editable-cell',
  imports: [CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    @if (isEditing()) {
      <input
        type="text"
        class="ds-editable-cell-input body-sm-regular"
        [value]="editValue()"
        (input)="handleInput($event)"
        (keydown.enter)="save()"
        (keydown.escape)="cancel()"
        (blur)="save()"
        #editInput
      />
    } @else {
      <span 
        class="ds-editable-cell"
        (dblclick)="startEdit()"
        title="Double-click to edit">
        {{ value() || placeholder() }}
      </span>
    }
  `,
  styles: [`
    .ds-editable-cell {
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: background 0.2s;
      display: inline-block;
      min-width: 50px;
    }
    
    .ds-editable-cell:hover {
      background: var(--color-background-neutral-secondary-hover);
    }
    
    .ds-editable-cell:empty::before {
      content: attr(title);
      color: var(--text-color-default-tertiary);
      font-style: italic;
    }
    
    .ds-editable-cell-input {
      width: 100%;
      padding: 4px 8px;
      border: 1px solid var(--border-color-default);
      border-radius: 4px;
      background: white;
      color: var(--text-color-default-primary);
    }
    
    .ds-editable-cell-input:focus {
      outline: 2px solid var(--color-background-brand);
      outline-offset: 1px;
    }
  `]
})
export class DsDataTableEditableCell {
  value = input.required<string>();
  placeholder = input<string>('Click to edit');
  
  valueChanged = output<string>();
  
  isEditing = signal(false);
  editValue = signal('');
  
  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editValue.set(value);
  }
  
  startEdit() {
    this.isEditing.set(true);
    this.editValue.set(this.value());
  }
  
  save() {
    if (this.editValue() !== this.value()) {
      this.valueChanged.emit(this.editValue());
    }
    this.isEditing.set(false);
  }
  
  cancel() {
    this.editValue.set(this.value());
    this.isEditing.set(false);
  }
}

/**
 * Action buttons cell component
 * Provides common actions like edit, delete, view
 */
@Component({
  selector: 'ds-data-table-actions-cell',
  imports: [CommonModule, DsButtonComponent],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div class="ds-actions-cell">
      @if (showView()) {
        <ds-button
          variant="ghost"
          size="sm"
          [iconOnly]="true"
          leadingIcon="remixEyeLine"
          ariaLabel="View"
          (clicked)="onView()"
        />
      }
      @if (showEdit()) {
        <ds-button
          variant="ghost"
          size="sm"
          [iconOnly]="true"
          leadingIcon="remixEditLine"
          ariaLabel="Edit"
          (clicked)="onEdit()"
        />
      }
      @if (showDelete()) {
        <ds-button
          variant="ghost"
          size="sm"
          [iconOnly]="true"
          leadingIcon="remixDeleteBinLine"
          ariaLabel="Delete"
          (clicked)="onDelete()"
        />
      }
    </div>
  `,
  styles: [`
    .ds-actions-cell {
      display: flex;
      gap: 4px;
      align-items: center;
    }
  `]
})
export class DsDataTableActionsCell {
  showView = input<boolean>(true);
  showEdit = input<boolean>(true);
  showDelete = input<boolean>(true);
  
  view = output<void>();
  edit = output<void>();
  delete = output<void>();
  
  onView() {
    this.view.emit();
  }
  
  onEdit() {
    this.edit.emit();
  }
  
  onDelete() {
    this.delete.emit();
  }
}

/**
 * Badge status cell component
 * Displays a badge with different variants based on value
 */
@Component({
  selector: 'ds-data-table-badge-cell',
  imports: [CommonModule, DsBadgeComponent],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <ds-badge [variant]="getBadgeVariant()">
      {{ label() }}
    </ds-badge>
  `,
})
export class DsDataTableBadgeCell {
  value = input.required<string>();
  label = input<string>('');
  variantMap = input<Record<string, 'default' | 'brand' | 'success' | 'warning' | 'destructive'>>({
    success: 'success',
    active: 'success',
    completed: 'success',
    warning: 'warning',
    pending: 'warning',
    error: 'destructive',
    failed: 'destructive',
    inactive: 'default',
    draft: 'default',
  });
  
  getBadgeVariant(): 'default' | 'brand' | 'success' | 'warning' | 'destructive' {
    const map = this.variantMap();
    const value = this.value().toLowerCase();
    return map[value] || 'default';
  }
}

/**
 * Checkbox cell for row selection
 */
@Component({
  selector: 'ds-data-table-checkbox-cell',
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <input
      type="checkbox"
      class="ds-checkbox-cell"
      [checked]="checked()"
      [indeterminate]="indeterminate()"
      (change)="onToggle()"
    />
  `,
  styles: [`
    .ds-checkbox-cell {
      cursor: pointer;
      width: 16px;
      height: 16px;
      accent-color: var(--color-background-brand);
    }
  `]
})
export class DsDataTableCheckboxCell {
  checked = input<boolean>(false);
  indeterminate = input<boolean>(false);
  
  toggle = output<boolean>();
  
  onToggle() {
    this.toggle.emit(!this.checked());
  }
}

/**
 * Helper function to create an editable column
 */
export function createEditableColumn<T>(
  accessor: keyof T,
  header: string,
  onValueChange: (row: T, newValue: string) => void
) {
  return {
    accessorKey: accessor as string,
    header,
    cell: (info: any) => {
      const value = info.getValue() as string;
      return `
        <span 
          class="ds-editable-cell-inline" 
          contenteditable="true"
          data-row-id="${info.row.id}"
          style="cursor: text; padding: 4px; border-radius: 4px; display: inline-block; min-width: 50px;"
        >
          ${value || '<span style="color: var(--text-color-default-tertiary); font-style: italic;">Click to edit</span>'}
        </span>
      `;
    },
  };
}

/**
 * Helper function to create an actions column
 */
export function createActionsColumn<T>(
  actions: {
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
  }
) {
  return {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    cell: (info: any) => {
      const row = info.row.original;
      const buttons: string[] = [];
      
      if (actions.onView) {
        buttons.push(`
          <button 
            class="ds-action-btn" 
            onclick="handleView('${info.row.id}')"
            aria-label="View">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        `);
      }
      
      if (actions.onEdit) {
        buttons.push(`
          <button 
            class="ds-action-btn" 
            onclick="handleEdit('${info.row.id}')"
            aria-label="Edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        `);
      }
      
      if (actions.onDelete) {
        buttons.push(`
          <button 
            class="ds-action-btn ds-action-btn-danger" 
            onclick="handleDelete('${info.row.id}')"
            aria-label="Delete">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        `);
      }
      
      return `
        <div class="ds-actions-cell" style="display: flex; gap: 4px;">
          ${buttons.join('')}
        </div>
      `;
    },
  };
}

