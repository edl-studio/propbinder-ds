import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';

export type AvatarType = 'initials' | 'photo' | 'icon';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ds-avatar',
  imports: [CommonModule, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-avatar.css'],
  template: `
    <div [class]="getAvatarClasses()">
      <!-- Initials Avatar -->
      <ng-container *ngIf="type === 'initials'">
        <span [class]="getInitialsClasses()">
          {{ getDisplayInitials() }}
        </span>
      </ng-container>
      
      <!-- Photo Avatar -->
      <ng-container *ngIf="type === 'photo'">
        <img 
          [src]="src" 
          [alt]="alt || 'Avatar'"
          [class]="getImageClasses()"
          (error)="onImageError()"
        />
      </ng-container>
      
      <!-- Icon Avatar -->
      <ng-container *ngIf="type === 'icon'">
        <ds-icon 
          [name]="iconName || 'remixUser3Fill'"
          [size]="getIconSize()"
          color="var(--text-color-default-primary-inverse)"
          class="avatar__icon"
        />
      </ng-container>
    </div>
  `,
})
export class DsAvatarComponent {
  // Input properties with decorators
  @Input() type: AvatarType = 'initials';
  @Input() size: AvatarSize = 'md';
  
  // Initials specific inputs
  @Input() initials: string = '';
  
  // Photo specific inputs
  @Input() src: string = '';
  @Input() alt: string = '';
  
  // Icon specific inputs
  @Input() iconName: string = 'remixUser3Fill';
  @Input() iconColor: string = 'secondary';
  
  // Methods instead of computed properties
  getAvatarClasses(): string {
    const classes = ['avatar'];
    
    // Size classes
    classes.push(`avatar--${this.size}`);
    
    // Type classes
    classes.push(`avatar--${this.type}`);
    
    // Add depth classes for icon avatars based on size
    if (this.type === 'icon') {
      const depthClass = this.getDepthClass();
      classes.push(depthClass);
    }
    
    // Add color variant for initials avatars
    if (this.type === 'initials') {
      classes.push(`avatar--${this.getColorVariant()}`);
    }
    
    return classes.join(' ');
  }
  
  getInitialsClasses(): string {
    const classes = ['avatar__initials'];
    classes.push(`avatar__initials--${this.size}`);
    return classes.join(' ');
  }
  
  getImageClasses(): string {
    const classes = ['avatar__image'];
    return classes.join(' ');
  }
  
  getDisplayInitials(): string {
    if (!this.initials) return '';
    
    // Take first 2 characters and uppercase them
    return this.initials.substring(0, 2).toUpperCase();
  }
  
  getIconSize(): string {
    const sizeMap: Record<AvatarSize, string> = {
      xs: '12px',
      sm: '14px',
      md: '18px', 
      lg: '24px',
      xl: '32px'
    };
    return sizeMap[this.size];
  }
  
  // Get color variant based on initials
  getColorVariant(): string {
    if (!this.initials) return 'light-brown';
    
    // Color variants that match the design system
    const colorVariants = [
      'light-brown',
      'rose',
      'pink',
      'purple',
      'blue',
      'light-blue',
      'turquoise',
      'light-green'
    ];
    
    // Calculate a hash from the initials
    let hash = 0;
    for (let i = 0; i < this.initials.length; i++) {
      hash = this.initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Use the hash to select a color variant
    const index = Math.abs(hash) % colorVariants.length;
    return colorVariants[index];
  }
  
  // Get depth class based on avatar size for icon avatars
  private getDepthClass(): string {
    const depthMap: Record<AvatarSize, string> = {
      xs: 'depth-sm',
      sm: 'depth-sm',
      md: 'depth-sm',
      lg: 'depth-md',
      xl: 'depth-lg'
    };
    return depthMap[this.size];
  }
  
  // Event handlers
  onImageError() {
    // Could emit an event or handle fallback logic here
    console.warn('Avatar image failed to load');
  }
}
