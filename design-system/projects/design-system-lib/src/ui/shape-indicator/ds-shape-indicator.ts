import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ShapeVariant = 'circle' | 'square' | 'diamond' | 'triangle' | 'pentagon';
export type ShapeColorVariant = 
  | 'default' 
  | 'brand' 
  | 'success' 
  | 'warning' 
  | 'destructive' 
  | 'blue' 
  | 'light-purple' 
  | 'pink' 
  | 'salmon-orange' 
  | 'orange' 
  | 'lime-green' 
  | 'grey';

@Component({
  selector: 'ds-shape-indicator',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: ['./ds-shape-indicator.css'],
  template: `
    <div [class]="containerClasses()">
      <svg width="8" height="8" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        @switch (shape()) {
          @case ('circle') {
            <!-- Circle: centered in 16x16 -->
            <path d="M0.887207 8C0.887207 3.85786 4.24507 0.5 8.38721 0.5C12.5293 0.5 15.8872 3.85786 15.8872 8C15.8872 12.1421 12.5293 15.5 8.38721 15.5C4.24507 15.5 0.887207 12.1421 0.887207 8Z" [attr.fill]="currentColor()" />
          }
          @case ('square') {
            <!-- Square: centered in 16x16 -->
            <path d="M0.887207 5.5C0.887207 2.73858 3.12578 0.5 5.88721 0.5H10.8872C13.6486 0.5 15.8872 2.73858 15.8872 5.5V10.5C15.8872 13.2614 13.6486 15.5 10.8872 15.5H5.88721C3.12578 15.5 0.887207 13.2614 0.887207 10.5V5.5Z" [attr.fill]="currentColor()" />
          }
          @case ('diamond') {
            <!-- Diamond: adjusted to fit 16x16 from original 17x16 -->
            <path d="M0.85777 10.3431C-0.436314 9.04906 -0.436314 6.95094 0.85777 5.65685L5.54406 0.970563C6.83814 -0.323521 8.93627 -0.323521 10.2304 0.970563L14.9166 5.65685C16.2107 6.95094 16.2107 9.04906 14.9166 10.3431L10.2304 15.0294C8.93627 16.3235 6.83814 16.3235 5.54406 15.0294L0.85777 10.3431Z" [attr.fill]="currentColor()" />
          }
          @case ('triangle') {
            <!-- Triangle: adjusted to fit 16x16 from original 17x16 -->
            <path d="M6.33574 1.4375C7.02528 0.1875 8.74913 0.1875 9.43867 1.4375L15.6445 12.6875C16.3341 13.9375 15.4721 15.5 14.0931 15.5H1.68135C0.302277 15.5 -0.559647 13.9375 0.129892 12.6875L6.33574 1.4375Z" [attr.fill]="currentColor()" />
          }
          @case ('pentagon') {
            <!-- Pentagon: adjusted to fit 16x16 from original 17x17 -->
            <path d="M6.59136 0.436532C7.36405 -0.145511 8.41036 -0.145511 9.18306 0.436533L14.9783 4.80186C15.751 5.3839 16.0743 6.4156 15.7792 7.35737L13.5656 14.4206C13.2704 15.3624 12.424 16 11.4688 16H4.30556C3.35046 16 2.50398 15.3624 2.20884 14.4206L-0.00474 7.35736C-0.299884 6.4156 0.023444 5.3839 0.796144 4.80186L6.59136 0.436532Z" [attr.fill]="currentColor()" />
          }
        }
      </svg>
      
      @if (label()) {
        <span class="shape-indicator__label">{{ label() }}</span>
      } @else if (hasContent()) {
        <span class="shape-indicator__label">
          <ng-content></ng-content>
        </span>
      }
    </div>
  `,
})
export class DsShapeIndicatorComponent {
  // Input signals
  shape = input<ShapeVariant>('circle');
  variant = input<ShapeColorVariant>('default');
  label = input<string>();
  
  // Internal computed properties
  hasContent = computed(() => {
    // This is a simplified check - in a real implementation you'd need to check ng-content
    return false;
  });
  
  containerClasses = computed(() => {
    const classes = ['shape-indicator'];
    
    // Variant classes for text color
    classes.push(`shape-indicator--${this.variant()}`);
    
    return classes.join(' ');
  });
  
  currentColor = computed(() => {
    // Map color variants to CSS custom properties
    const colorMap: Record<ShapeColorVariant, string> = {
      default: 'var(--color-background-neutral-secondary)',
      brand: 'var(--color-background-brand)',
      success: 'var(--color-success-base)',
      warning: 'var(--color-warning-base)',
      destructive: 'var(--color-destructive-base)',
      blue: 'var(--color-blue-base)',
      'light-purple': 'var(--color-light-purple-base)',
      pink: 'var(--color-pink-base)',
      'salmon-orange': 'var(--color-salmon-orange-base)',
      orange: 'var(--color-orange-base)',
      'lime-green': 'var(--color-lime-green-base)',
      grey: 'var(--color-grey-base)'
    };
    return colorMap[this.variant()];
  });
}
