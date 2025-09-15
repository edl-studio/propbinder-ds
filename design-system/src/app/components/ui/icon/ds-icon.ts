import { Component, input, computed, ViewEncapsulation } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

export type IconSize =
  | '12px'
  | '14px'
  | '16px'
  | '18px'
  | '20px'
  | '22px'
  | '24px'
  | '32px';
export type IconColor = 'primary' | 'secondary' | 'tertiary' | 'brand' | 'success' | 'warning' | 'destructive';
export type IconColorValue = IconColor | `#${string}` | `rgb(${string})` | `hsl(${string})` | `var(${string})` | string;

@Component({
  selector: 'ds-icon',
  standalone: true,
  imports: [NgIcon],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-icon.css'],
  template: `
    <ng-icon 
      [name]="name()" 
      [size]="computedSize()"
      [color]="computedColor()"
      [class]="iconClasses()"
    ></ng-icon>
  `,
})
export class DsIconComponent {
  // Input signals
  name = input.required<string>();
  size = input<IconSize | string>('20px');
  color = input<IconColorValue>();
  interactive = input<boolean>(false);

  // Computed properties for semantic CSS classes
  iconClasses = computed(() => {
    const classes = ['icon'];
    
    // Size class (only for predefined sizes)
    const sizeValue = this.size();
    if (this.isPredefinedSize(sizeValue)) {
      // Use numeric suffix for class name e.g. icon--20
      const numeric = parseInt(sizeValue as string, 10);
      classes.push(`icon--${numeric}`);
    }
    
    // Interactive state
    if (this.interactive()) {
      classes.push('icon--interactive');
    }
    
    return classes.join(' ');
  });

  // Computed size for ng-icon (handles both predefined and custom sizes)
  computedSize = computed(() => {
    const sizeValue = this.size();
    
    // If it's a predefined size, return the size value as-is
    if (this.isPredefinedSize(sizeValue)) {
      return sizeValue as string;
    }
    
    // Otherwise, return the custom size as-is
    return sizeValue;
  });

  // Computed color for ng-icon (maps predefined colors to CSS variables, passes through custom colors)
  computedColor = computed(() => {
    const colorValue = this.color();
    
    if (!colorValue) {
      return undefined;
    }
    
    // Map predefined colors to CSS variables
    if (this.isPredefinedColor(colorValue)) {
      const colorMap: Record<IconColor, string> = {
        primary: 'var(--text-color-default-primary)',
        secondary: 'var(--text-color-default-secondary)',
        tertiary: 'var(--text-color-default-tertiary)',
        brand: 'var(--text-color-brand)',
        success: 'var(--color-success-base)',
        warning: 'var(--color-warning-base)',
        destructive: 'var(--color-destructive-base)'
      };
      return colorMap[colorValue];
    }
    
    // Return custom color for ng-icon
    return colorValue;
  });

  private isPredefinedSize(size: string): size is IconSize {
    return [
      '12px',
      '14px',
      '16px',
      '18px',
      '20px',
      '22px',
      '24px',
      '32px',
    ].includes(size);
  }

  private isPredefinedColor(color: string): color is IconColor {
    return ['primary', 'secondary', 'tertiary', 'brand', 'success', 'warning', 'destructive'].includes(color);
  }
} 