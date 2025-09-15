import { Component, input, output, computed, signal, ViewEncapsulation } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-button',
  imports: [CommonModule, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-button.css'],
  template: `
    <button
      [class]="buttonClasses()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-pressed]="pressed() ? 'true' : null"
      [attr.aria-expanded]="expanded() ? 'true' : 'false'"
      (click)="handleClick($event)"
      (focus)="onFocus()"
      (blur)="onBlur()"
      #buttonElement
    >
      <!-- Leading Icon -->
      @if (leadingIcon() && !loading()) {
        <ds-icon 
          [name]="leadingIcon()!" 
          [size]="iconSize()"
          class="btn__icon"
        />
      }
      
      <!-- Button Content -->
      <span [class]="contentClasses()" [style.display]="iconOnly() ? 'none' : 'flex'">
        <ng-content></ng-content>
      </span>
      
      <!-- Trailing Icon -->
      @if (trailingIcon() && !loading()) {
        <ds-icon 
          [name]="trailingIcon()!" 
          [size]="iconSize()"
          class="btn__icon"
        />
      }
      
      <!-- Loading Spinner -->
      @if (loading()) {
        <div class="btn__loading">
          <ds-icon 
            name="remixLoader4Line" 
            [size]="iconSize()" 
            class="btn__icon btn__icon--loading"
          />
        </div>
      }
    </button>
  `,

})
export class DsButtonComponent {
  // Input signals
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  pressed = input<boolean>(false);
  expanded = input<boolean>(false);
  leadingIcon = input<string>();
  trailingIcon = input<string>();
  ariaLabel = input<string>();
  iconOnly = input<boolean>(false);
  
  // Output signals
  clicked = output<MouseEvent>();
  focused = output<FocusEvent>();
  blurred = output<FocusEvent>();
  
  // Internal state
  private isFocused = signal<boolean>(false);
  
  // Computed properties for semantic CSS classes
  buttonClasses = computed(() => {
    const classes = ['btn'];
    
    // Size classes
    classes.push(`btn--${this.size()}`);
    
    // Variant classes
    classes.push(`btn--${this.variant()}`);
    
    // Padding classes based on icon presence
    const paddingClass = this.getPaddingClass();
    classes.push(paddingClass);
    
    // State classes
    if (this.pressed()) {
      classes.push('btn--pressed');
    }
    
    return classes.join(' ');
  });
  
  contentClasses = computed(() => {
    const classes = ['btn__content'];
    if (this.loading()) {
      classes.push('btn__content--loading');
    }
    return classes.join(' ');
  });
  
  private getPaddingClass(): string {
    const hasLeadingIcon = !!this.leadingIcon();
    const hasTrailingIcon = !!this.trailingIcon();
    const size = this.size();
    
    // Icon-only buttons get square padding
    if (this.iconOnly()) {
      return `btn--padding-icon-only-${size}`;
    }
    
    if (hasLeadingIcon && hasTrailingIcon) {
      return 'btn--padding-with-both';
    } else if (hasLeadingIcon) {
      return 'btn--padding-with-leading';
    } else if (hasTrailingIcon) {
      return 'btn--padding-with-trailing';
    } else {
      return size === 'sm' ? 'btn--padding-default-sm' : 'btn--padding-default';
    }
  }
  
  iconSize = computed(() => {
    const sizeMap: Record<ButtonSize, string> = {
      sm: '16px', 
      md: '18px',
      lg: '20px'
    };
    return sizeMap[this.size()];
  });
  
  // Event handlers
  handleClick(event: MouseEvent) {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
  
  onFocus() {
    this.isFocused.set(true);
    this.focused.emit(new FocusEvent('focus'));
  }
  
  onBlur() {
    this.isFocused.set(false);
    this.blurred.emit(new FocusEvent('blur'));
  }
} 